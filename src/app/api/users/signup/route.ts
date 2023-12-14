import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { UpdateToken, createProfile, createUser, getUserByEmail } from "@/db/utils/user";
import { generateAndSetToken, generateToken } from "@/lib/auth";




export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {firstName, lastName, email, password} = reqBody


        //check if user exists
        const user = await getUserByEmail(email)

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
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

        


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user:userWithProfile
        })

    

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}