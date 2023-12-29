import { NextResponse } from "next/server";
import { mongoConnect } from '@/utils/db'
import {User} from '@/models/user/user.model.js'
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { appConfig } from "@/utils/config";
import { sendEmail } from "@/utils/mailer";


mongoConnect()
export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { email } = reqBody;
        console.log(email)

        // //check if user exists
        const user = await User.findOne({ email })
        console.log(user)

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        //Send verification mail
        await sendEmail({email, emailType:'forget', userId: user._id}) 


        return NextResponse.json({
            message: "Password reset link sent successfully",
            success: true,
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }



}