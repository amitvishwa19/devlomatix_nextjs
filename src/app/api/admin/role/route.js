import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { appConfig } from "@/utils/config";
import { User } from "@/models/user/user.model";
import jwt from 'jsonwebtoken'
import { Role } from "@/models/admin/role.model ";

mongoConnect()

export async function GET(request) {
    try {
        //console.log('roles get method')

        const token = request.cookies.get('token').value || ''
        //console.log('Token', token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        //console.log('AUth', auth)

        if(!auth){
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

         const user = await User.findById(auth.id).select('-password')
         //console.log('User', user)

         if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }



        const roles = await Role.find().populate('permissions')
        return NextResponse.json({
            message: 'data fetched successfully',
            data: roles,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(request) {
    try {

        const payload = await request.json()
        const { title, description, status, permissions } = payload
        const token = request.cookies.get('token').value || ''
        

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const auth = jwt.verify(token, appConfig.app.appSecret)

        if(!auth){
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findById(auth.id).select('-password')

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const newRole = new Role({
            title,
            description,
            status:status,
            permissions: permissions.map(i => i._id ),
            createdBy: user._id
        })
        const saveRole = await newRole.save()

        return NextResponse.json({
            message: 'Role added successfully',
            data: saveRole,
        })
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



