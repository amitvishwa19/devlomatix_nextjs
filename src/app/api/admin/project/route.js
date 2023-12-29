import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { Project } from "@/models/project/project.model";
import {User} from "@/models/user/user.model";
import jwt from 'jsonwebtoken'
import { appConfig } from "@/utils/config";


mongoConnect()

export async function GET(request) {
    try {
        console.log('Get all Projects')
        const projects = await Project.find()
        console.log(projects)

        //const auth = request.cookies.get('token').value || ''
        //const data = jwt.verify(auth, appConfig.app.appSecret)
        //const user = await User.findById(data.id)


        return NextResponse.json({
            message: 'User found',
            data: projects,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request) {

    try {

        const auth = request.cookies.get('token').value || ''
        const data = jwt.verify(auth, appConfig.app.appSecret)
        const user = await User.findById(data.id).select('-password')

        

        const payload = await request.json()
        const { title, description } = payload



        // const user = await User.findById(userId)
        console.log('User', user._id)


        const newProject = new Project({
            title,
            description,
            owner: user._id
        })

        console.log(newProject)
        const saveProject = await newProject.save()

        console.log(saveProject)

        return NextResponse.json({
            message: 'User found',
            data: user._id,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}