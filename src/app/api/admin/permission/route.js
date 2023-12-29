import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { appConfig } from "@/utils/config";
import { User } from "@/models/user/user.model";
import jwt from 'jsonwebtoken'
import { Permission } from "@/models/admin/permission.model";

mongoConnect()

export async function GET(request) {
    try {
        const permissions = await Permission.find()
        return NextResponse.json({
            message: 'data fetched successfully',
            data: permissions,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(request) {
    try {

        const payload = await request.json()
        console.log(payload)
        const { title, description, status } = payload


        const token = request.cookies.get('token').value || ''
        console.log('Token', token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        console.log('AUth', auth)

        if(!auth){
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

         const user = await User.findById(auth.id).select('-password')
         console.log('User', user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const newPermission = new Permission({
            title,
            description,
            status:status,
            createdBy: user._id
        })
        console.log('New permission', newPermission)


        const savePermission = await newPermission.save()

        return NextResponse.json({
            message: 'Permission added successfully',
            data: savePermission,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



