import { NextResponse } from "next/server";
import { mongoConnect } from "@/utils/db";
import { TaskPiller } from "@/models/taskman/taskpiller.model";
import { slugify } from "@/utils/functions";
import { verifiedUser } from "@/controllers/user.controller";
import { Task } from "@/models/taskman/task.model";
import { TaskBoard } from "@/models/taskman/taskboard.model";

mongoConnect()
export async function GET(request) {
    try {
        const id = request.url.split('piller/')[1]
        console.log('getting pillars', id)
        const user = await verifiedUser(request)



        const pillars = await TaskPiller.find({ board: id }).populate('tasks')

        return NextResponse.json({
            message: 'pillers fetched successfully',
            data: pillars,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const id = request.url.split('piller/')[1]
        console.log('Piller Delete API', id)

        const deletedPiller = await TaskPiller
            .findById(id)

        console.log('piller to be delete from board ::', deletedPiller.board)

        await deletedPiller.tasks.forEach(async (e) => {
            const task = await Task.findByIdAndDelete(e)
        });

        await TaskPiller.findByIdAndDelete(id)


        await TaskBoard.findByIdAndUpdate(deletedPiller.board, { $pull: { pillers: id } })

        const board = await TaskBoard
        .findById(deletedPiller.board)
        .populate({path:'pillers', populate:{path:'tasks'}})

        return NextResponse.json({
            message: 'pillers deleted successfully',
            data: board,
        })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}