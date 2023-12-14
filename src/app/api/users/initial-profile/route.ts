import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRefreshToken } from "@/lib/auth";
import { getUserById } from "@/db/utils/user";



// the initial profile route is not protected it will check directly if the user has a refresh token, 
// and issue an access token if he does, this route is intended to persist logged in users

export async function GET(request:NextRequest){

    try {
        const refreshToken = request.cookies.get("refreshToken")?.value || '';
        if(!refreshToken) {
            return NextResponse.json({
                message: 'user does not has refresh token',
                user:null
            }, {status: 200})
        }
        const userId = await getUserIdFromRefreshToken(refreshToken);
        const user = await getUserById(userId)
        return NextResponse.json({
            message: "User found",
            user,
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}