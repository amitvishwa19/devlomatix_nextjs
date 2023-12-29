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
        const { token, password } = reqBody;
        console.log(reqBody)


        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        console.log(user);

        if (!user) {
            return NextResponse.json({ error: "Invalid Password reset link" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)


        user.password = hashedPassword;
        user.emailVerified = true;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
 
        // //Send verification mail
        // await sendEmail({email, emailType:'RESET', userId: user._id}) 


        return NextResponse.json({
            message: "Password reset link sent successfully",
            success: true,
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }



}