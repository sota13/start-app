import { generateAndSetToken, generateToken, isAccessTokenValid, isRefreshTokenValid } from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { cookies } from "next/headers";

const t = initTRPC.create();

export const router = t.router;
const middleware = t.middleware

const isAuthenticated = middleware(async ({next}) => {
  const accessToken = cookies().get("accessToken")?.value || '';
  const refreshToken = cookies().get('refreshToken')?.value || '';
  if(!accessToken || !refreshToken) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
  const {userId:userIdFromAccess} = await isAccessTokenValid(accessToken)

  console.log('we are living in the trpc middleware and here is a user id 1', userIdFromAccess)

  if (!userIdFromAccess) {
    const {userId:userIdFromRefresh} = await isRefreshTokenValid(refreshToken)
    if (!userIdFromRefresh) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    console.log('we are living in the trpc middleware and here is a user id 2', userIdFromRefresh)

    await generateAndSetToken(userIdFromRefresh)
    
    return next({
      ctx: {
        userId: userIdFromRefresh,
      },
    })
  }

  return next({
    ctx: {
      userId: userIdFromAccess,
    },
  })
})
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated)
