import { verifiedUser } from "@/controllers/user.controller";
import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { slugify } from "@/utils/functions";
import { TaskBoard } from "@/models/taskman/taskboard.model";
import { TaskPiller } from "@/models/taskman/taskpiller.model";
import { Task } from "@/models/taskman/task.model";




mongoConnect()


export async function POST(request) {
    try {
        console.log('Add new task /api/v1/taskman/board/task')
        



        const payload = await request.json()
        console.log(payload)
      
        const { board, title, description, status, piller, priority } = payload

        const user = await verifiedUser(request)

        if (!user) {
            return NextResponse.json({ error: "unauthorized request" }, { status: 400 })
        }

        const newTask = new Task({
            title,
            slug: slugify(title),
            description,
            status: status,
            priority,
            board,
            piller,
            owner: user._id,
            creator: user._id
        })

        const saveTask = await newTask.save()

        // console.log('New piller added' , saveTaskPiller)

        if(saveTask){
            const updatePiller = await TaskPiller.findByIdAndUpdate(piller, { $push: { tasks: saveTask._id } })
            //const updateBoard = await TaskBoard.findByIdAndUpdate(board, { $push: { tasks: saveTask._id } })
        }

        return NextResponse.json({
            message: 'Piller added successfully',
            data: saveTask,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}