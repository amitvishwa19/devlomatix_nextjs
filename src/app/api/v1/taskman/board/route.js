import { verifiedUser } from "@/controllers/user.controller";
import { NextResponse } from "next/server";
import { TaskBoard } from '@/models/taskman/taskboard.model';
import { slugify } from "@/utils/functions";

// export async function GET(request) {

//     try { 
//         console.log('Board by id')  
//         const id = request.url.split('board/')[1]
//         console.log('getting pillars', id)
//         const user = await verifiedUser(request)

    

//         //const pillars = await TaskPiller.find({board:id}).populate('tasks')
//         const board = await TaskBoard.findById(id)

//         return NextResponse.json({
//             message: 'board fetched successfully',
//             data: board,
//         })

//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     }
// }


export async function POST(request) {

    try {
        const payload = await request.json()
        const { title, description, status } = payload

        const user = await verifiedUser(request)

        if (!user) {
            return NextResponse.json({ error: "unauthorized request" }, { status: 400 })
        }

        const newTaskBoard = new TaskBoard({
            title,
            slug: slugify(title),
            description,
            status: status,
            creator: user._id
        })

        const saveTaskBoard = await newTaskBoard.save()


        if (saveTaskBoard) {
            const updateTaskBoard = await TaskBoard.findByIdAndUpdate(saveTaskBoard._id, { $push: { users: user._id } })
        }


        return NextResponse.json({
            message: 'Task Board created successfully',
            data: saveTaskBoard,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}