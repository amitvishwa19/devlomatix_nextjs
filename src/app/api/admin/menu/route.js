import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import jwt from 'jsonwebtoken'
import { appConfig } from "@/utils/config";
import { User } from "@/models/user/user.model";
import { Menu } from "@/models/menu/menu.model";


mongoConnect()

export async function GET(request) {
    try {
        //const payload = await request.json()

        //const token = request.cookies.get('token')
        //console.log(token)

        const menu = await Menu.find()

        //console.log(payload)
        
        //const token = request.cookies.get('token').value || ''
        //const auth = jwt.verify(token, appConfig.app.appSecret)
        //const user = await User.findById(auth.id).select('-password')





        // if (!user) {
        //     return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        // }















        return NextResponse.json({
            message: 'Menu data loaded successfully',
            data: menu,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(request) {
    try {
        const payload = await request.json()
        const { block, title, description } = payload
        //console.log(payload)

        const token = request.cookies.get('token').value || ''
        //console.log('Token', token)
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }


        const auth = jwt.verify(token, appConfig.app.appSecret)
        //console.log('AUth', auth)

        const user = await User.findById(auth.id).select('-password')
        //console.log('User', user)

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }


        const newMenu = new Menu({
            title,
            description,
            owner: user._id
        })
        //console.log('New menu' , newMenu)


        const saveMenu = await newMenu.save()
        //console.log('Saved menu' , saveMenu)


        return NextResponse.json({
            message: 'Menu post request',
            data: saveMenu,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}   