import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {User} from '@/models/user/user.model.js'
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { tokenData } from "@/utils/tokenData";
import { mongoConnect } from "@/utils/db";
import { appConfig } from "@/utils/config";
//import { mongoConnect } from "../db";


mongoConnect()


export async function GET(request){

    try {

        const token = request.cookies.get('token').value
        console.log(token)

        const auth = jwt.verify(token, appConfig.app.appSecret)
        console.log(auth)


        const user = await User.findById(auth.id).select('-password')

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        
        return NextResponse.json({
            message: 'user details',
            data: auth,
        })
        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }


}