import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({
            message:'Logout success',
            success:true
        })

        response.cookies.set('token',null,{
            httpOnly:true,
            expires:new Date(0)
        })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}