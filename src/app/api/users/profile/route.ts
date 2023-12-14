import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/db/utils/user";


export async function GET(request:NextRequest){

    try {
        const accessToken = request.cookies.get("accessToken")?.value || '';
        if(!accessToken) {
            return NextResponse.json({error: 'there is no accessToken'}, {status: 401})
        }
        // const userId = getUserIdFromToken(accessToken);
        const userId = request.headers.get("userId");

        if (!userId) {
            return NextResponse.json({error: 'invalid access token'}, {status: 400});
        }
        const user = await getUserById(Number(userId))
        return NextResponse.json({
            message: "User found",
            user,
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}