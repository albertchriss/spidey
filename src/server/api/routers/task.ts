import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { auth } from "~/server/auth";
import { tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  getTaskById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const data = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.id, input.id))
        .limit(1);
      return data[0] ?? null;
    }),
  getUserTasks: protectedProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const session = await auth();

      const data = await ctx.db
        .select()
        .from(tasks)
        .where(
          and(
            eq(tasks.userId, input.id),
            eq(tasks.isCompleted, input.completed),
          ),
        );

      return session?.user.id == input.id ? (data ?? null) : null;
    }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().optional(),
        deadline: z.date(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newTask = await ctx.db
        .insert(tasks)
        .values({
          title: input.title,
          description: input.description,
          deadline: input.deadline,
          userId: input.userId,
        })
        .returning({
          id: tasks.id,
          title: tasks.title,
          description: tasks.description,
          deadline: tasks.deadline,
          isCompleted: tasks.isCompleted,
          createdAt: tasks.createdAt,
          updatedAt: tasks.updatedAt,
          userId: tasks.userId,
        });
      return newTask[0];
    }),

  deleteTask: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(tasks).where(eq(tasks.id, input.id));
    }),

  deleteSomeTasks: protectedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(tasks).where(inArray(tasks.id, input.ids));
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
        deadline: z.date().optional(),
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Construct an update object only with fields that have a value
      await ctx.db
        .update(tasks)
        .set({
          ...(input.title !== undefined && { title: input.title }),
          ...(input.description !== undefined && {
            description: input.description,
          }),
          ...(input.deadline !== undefined && { deadline: input.deadline }),
        })
        .where(eq(tasks.id, input.id));

      const updatedTask = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.id, input.id))
        .limit(1);
      return updatedTask[0] ?? null;
    }),

  markTask: protectedProcedure
    .input(z.object({ id: z.number(), isCompleted: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(tasks)
        .set({ isCompleted: input.isCompleted })
        .where(eq(tasks.id, input.id));
    }),

  markSomeTasks: protectedProcedure
    .input(z.object({ ids: z.array(z.number()), isCompleted: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(tasks)
        .set({ isCompleted: input.isCompleted })
        .where(inArray(tasks.id, input.ids));
    }),
});
