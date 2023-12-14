import { NextRequest, NextResponse } from "next/server";
import { generateAndSetToken, isRefreshTokenValid } from "@/lib/auth";



export async function GET(request:NextRequest){

    try {
        const refreshToken = request.cookies.get('refreshToken')?.value || ''

        const {isValid, userId} = await isRefreshTokenValid(refreshToken)

        if (!isValid || !userId) {
          return NextResponse.json({error: 'not valid token'}, {status: 401})
        }

        await generateAndSetToken(userId)

        return NextResponse.json({
          mesaaage: "Successfuly refreshed access token",
        })


    } catch (error:any) {
      return NextResponse.json({error: 'not valid token'}, {status: 401})
    }

}