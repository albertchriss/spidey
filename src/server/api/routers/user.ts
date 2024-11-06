import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";


export const userRouter = createTRPCRouter({
    getUserById: publicProcedure.input(z.string()).query(
        async ({ input }) => {
            const result = await db.select().from(users).where(eq(users.id, input));
            return (result && result[0]) || null;
        }
    )
})