import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {



        

        return NextResponse.json({
            message: "reques success!",
            success: true,
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}