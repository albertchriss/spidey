import { eq } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  getTaskById: protectedProcedure.input(z.object({id: z.number()})).query(
    async ({ input, ctx }) => {
      const data = await ctx.db.select().from(tasks).where(eq(tasks.id, input.id));
      return data[0] ?? null;
    }
  ),
  getUserTasks: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const data = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, input.id));
      return data ?? null;
    }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(256),
        description: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(tasks).values({
        title: input.title,
        description: input.description,
        userId: input.userId,
      });
    }),
});
