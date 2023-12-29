import { verifiedUser } from "@/controllers/user.controller";
import { NextResponse } from "next/server";
import { TaskBoard } from '@/models/taskman/taskboard.model';



export async function GET(request) {

    try {
        console.log('Board page-getting board-populate piller')
        const id = request.url.split('board/')[1]
        const user = await verifiedUser(request)

        if (!user) {
            return NextResponse.json({ error: "unauthorized request" }, { status: 400 })
        }

        const board = await TaskBoard
        .findById(id)
        .populate({path:'pillers', populate:{path:'tasks'}})

        
        return NextResponse.json({ message: "selected taskboards", data: board })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}