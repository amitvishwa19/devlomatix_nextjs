import { verifiedUser } from "@/controllers/user.controller";
import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { TaskBoard } from '@/models/taskman/taskboard.model';
import { TaskPiller } from "@/models/taskman/taskpiller.model";
import { slugify } from "@/utils/functions";

mongoConnect()

export async function GET(request) {
    try {   
        const id = request.url.split('piller/')[1]
        console.log('getting pillars', id)
        const user = await verifiedUser(request)

    

        const pillars = await TaskPiller.find({board:id}).populate('tasks')

        return NextResponse.json({
            message: 'pillers fetched successfully',
            data: pillars,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(request) {
    try {
        console.log('Add new piller /api/v1/taskman/board/piller')

        const payload = await request.json()
        const { title, description, board,status } = payload

        const user = await verifiedUser(request)

        if (!user) {
            return NextResponse.json({ error: "unauthorized request" }, { status: 400 })
        }

        const newTaskColumn = new TaskPiller({
            title,
            slug: slugify(title),
            description,
            status,
            board,
            creator: user._id
        })

        const saveTaskPiller = await newTaskColumn.save()

        console.log('New piller added' , saveTaskPiller)

        if(saveTaskPiller){
            const updateBoard = await TaskBoard.findByIdAndUpdate(saveTaskPiller.board, { $push: { pillers: saveTaskPiller._id } })
        }

        return NextResponse.json({
            message: 'Piller added successfully',
            data: saveTaskPiller,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}