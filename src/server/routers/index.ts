import { eq } from "drizzle-orm";
import { db, sql} from '@/db'

import { string, z } from "zod";

import { publicProcedure, router } from "../trpc";
import { profile, user } from "@/db/schema/user";
import { drizzle } from "drizzle-orm/postgres-js";
import * as userSchema from "@/db/schema/user";
import { userRouter } from "./user";

const userQuery = drizzle(sql, {schema:userSchema});


type NewUser = typeof user.$inferInsert;
type NewProfile = typeof profile.$inferInsert;


export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
