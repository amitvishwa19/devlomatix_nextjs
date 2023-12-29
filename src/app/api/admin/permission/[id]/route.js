import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { appConfig } from "@/utils/config";
import { User } from "@/models/user/user.model";
import jwt from 'jsonwebtoken'
import { Permission } from "@/models/admin/permission.model";

export async function GET(request) {
    try {

        const id = request.url.split('permission/')[1]
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

        const permission = await Permission.findById(id)

        return NextResponse.json({
            message: 'data fetched successfully',
            data: permission,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json()
        const id = request.url.split('permission/')[1]
        const {title, description, status } = payload

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

        const permission = await Permission.findByIdAndUpdate(id,{title, description, status})

        if(!permission){
            return NextResponse.json({ error: "permission not found" }, { status: 400 })
        }




        return NextResponse.json({
            message: 'permission updated successfully',
            data: permission,
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function DELETE(request){
    try {
        const id = request.url.split('permission/')[1]

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
        // console.log('Permission to delete',id)
        const permission = await Permission.findByIdAndDelete(id)
        //console.log('Deleted Permission',permission)

        if(!permission){
            return NextResponse.json({ error: "permission not found" }, { status: 400 })
        }

        return NextResponse.json({
            message: 'permission deleted successfully',
            data: 'permission',
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
