import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { appConfig } from "@/utils/config";
import { User } from "@/models/user/user.model";
import jwt from 'jsonwebtoken'
import { Role } from "@/models/admin/role.model ";

export async function GET(request) {
    try {

        const id = request.url.split('permission/')[1]
        const token = request.cookies.get('token').value || ''
        //console.log('Token', token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        //console.log('Auth', auth)

        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findById(auth.id).select('-password')
        //console.log('User', user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const role = await Role.findById(id)

        return NextResponse.json({
            message: 'data fetched successfully',
            data: role,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json()
        const id = request.url.split('role/')[1]
        const { title, description, status, permissions } = payload
        //console.log("id", id)

        const token = request.cookies.get('token').value || ''
        //console.log('Token', token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        //console.log('AUth', auth)

        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findById(auth.id).select('-password')
        //console.log('User', user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const role = await Role.findByIdAndUpdate(id,
            { title, 
                description, 
                status,
                permissions: permissions.map(i => i._id ), 
            }
        )

        if (!role) {
            return NextResponse.json({ error: "role not found" }, { status: 400 })
        }




        return NextResponse.json({
            message: 'role updated successfully',
            data: role,
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function DELETE(request) {
    try {
        const id = request.url.split('role/')[1]
        //console.log('Delete id', id)

        const token = request.cookies.get('token').value || ''
        //console.log('Token', token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        //console.log('AUth', auth)

        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findById(auth.id).select('-password')
        //console.log('User', user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }
        // console.log('Permission to delete',id)
        const role = await Role.findByIdAndDelete(id)
        //console.log('Deleted Permission',permission)

        if (!role) {
            return NextResponse.json({ error: "role not found" }, { status: 400 })
        }

        return NextResponse.json({
            message: 'role deleted successfully',
            data: role,
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
