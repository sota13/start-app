import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { db, sql} from '@/db'
import { profile, user } from "@/db/schema/user";
import { drizzle } from "drizzle-orm/postgres-js";
import * as userSchema from "@/db/schema/user";
import { TRPCError } from "@trpc/server";
import { createProfile, createUser, getUserByEmail } from "@/db/utils/user";
import bcryptjs from "bcryptjs";
import { generateAndSetToken } from "@/lib/auth";

const userQuery = drizzle(sql, {schema:userSchema});


type NewUser = typeof user.$inferInsert;
type NewProfile = typeof profile.$inferInsert;







export const userRouter = router({
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().nullish(),
        }),
      )
      .query(async ({ input }) => {
        console.log(input)
        return (await db.select().from(user));
      }),
    profile: privateProcedure
      .query(async ({ctx}) => {
        console.log('ctx: ',ctx)
        console.log('userId: ',ctx.userId)
        const user = await userQuery.query.user.findFirst({
          where:eq(userSchema.user.id, ctx.userId),
          columns: {
            id: true,
            email: true,
            role:true,
            isVerfied:true
          },
          with:{
            profile:true
          }
        })
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No user with id '${ctx.userId}'`,
          });
        }
        return user;
      }),
    signup: publicProcedure
    .input(
      z.object({
        firstName:z.string(),
        lastName:z.string(),
        email:z.string(),
        password:z.string(),
      })
    )
    .mutation(async ({input:{firstName,lastName,email,password}}) => {
      //check if user exists
      const user = await getUserByEmail(email)
      if(user){
        throw new TRPCError({
          code:'BAD_REQUEST',
          message: 'user with this email is already exist',
        });
      }

      // hash password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)

      const newUser = await createUser({email, password:hashedPassword})

      const newProfile = await createProfile({
          userId:newUser[0].id,
          firstName,
          lastName
      })

      const userWithProfile = {
        ...newUser[0],
        profile: {
            ...newProfile[0]
        }
      }

      await generateAndSetToken(newUser[0.].id)


      return {
        message: "User created successfully",
        success: true,
        user:userWithProfile
    };
    }),

  });