
import { ApiError } from '@/utils/apiError';
import { asyncHandler } from '@/utils/asyncHandler'
import { NextResponse } from "next/server";
import { headers, cookies } from 'next/headers';
import jwt from 'jsonwebtoken'
import { appConfig } from '@/utils/config';
import { User } from "@/models/user/user.model";
import { mongoConnect } from "@/utils/db";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/reducers/AuthReducer';

mongoConnect()

async function registerUser(req, res) {

    try {
        const payload = await req.json();
        const { username, email, password } = payload

        //Checking for user if already exixts
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "Oops ! You are already registered, Try to recover your password" }, { status: 400 })
        }

        //Generating salt password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //Creating user
        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()

        //Send verification mail
        await sendEmail({ email, emailType: 'verify', userId: savedUser._id })


        return NextResponse.json({ message: "Registration success", data: savedUser })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

async function verifyEmail(req) {
    try {
        console.log('Verify Email')
        const payload = await req.json()
        const { token } =payload
        
        //Getting user
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "Invalid verification token"}, {status: 400})
        }


        user.emailVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verification success", success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function loginUser(req, res) {
    try {
        const payload = await req.json();
        const { username, email, password } = payload

        //Checking for user if already exixts
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        // //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        if (!user.emailVerified) {
            return NextResponse.json({ error: "Email is not verified, Please verify your email first" }, { status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
        }

        //create token
        const token = jwt.sign(tokenData, appConfig.app.appSecret, { expiresIn: "1h" })

        //Create RefreshToken
        const refreshToken = jwt.sign(tokenData, appConfig.app.appSecret, { expiresIn: "30d" })
        user.refreshToken = refreshToken;
        await user.save();


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data: {
                user: { id: user._id, email: user.email, avatar: user.avatar },
                token: token,
                refreshToken:refreshToken,
                roles: {},
                permissions: {}
            }

        })

        response.cookies.set("token", token, { httpOnly: true, secure: true })
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: true })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

async function verifiedUser(request) {

    try {
        console.log('Usercontroller called')
        //const headersList = headers();
        const cookieToken = await request.cookies.get('token')?.value
        console.log('cookieToken', cookieToken)
        const bearerToken = headers().get('authorization')?.replace("Bearer ", "")
        console.log('bearerToken', bearerToken)

        const accessToken = cookieToken || bearerToken
        const auth = jwt.verify(accessToken, appConfig.app.appSecret)

        console.log('verifyUser', auth)

        const user = await User.findById(auth.id).select('-password -updatedAt -createdAt -__v')
        return user
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
        console.log('user controller error', error.message)
        return null
    }


}

async function verifyToken(req){

}

async function logout(req){
    
    try {
        const response = NextResponse.json({
            message:'Logout success',
            success:true
        })

        response.cookies.delete('token')
        response.cookies.delete('refreshToken')

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}















export {
    registerUser,
    verifyEmail,
    loginUser,
    verifyToken,
    verifiedUser,
    logout
}