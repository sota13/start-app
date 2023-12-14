import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/db/utils/user";
import { generateAndSetToken } from "@/lib/auth";






export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const user = await getUserByEmail(email)
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        

        await generateAndSetToken(user.id)


        const userDetail = {
            ...user,
            password:null
        }


        return NextResponse.json({
            message: "Login successful",
            success: true,
            user:userDetail
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}