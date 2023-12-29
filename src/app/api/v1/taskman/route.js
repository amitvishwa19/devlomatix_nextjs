import { verifiedUser } from "@/controllers/user.controller";
import { NextResponse } from "next/server";
import { TaskBoard } from '@/models/taskman/taskboard.model';


export async function GET(request) {

    try {
        const user = await verifiedUser(request)

        if (!user) {
            return NextResponse.json({ error: "unauthorized request" }, { status: 400 })
        }

        const taskBoards = await TaskBoard
            .find()
            .where({status:true})
            .populate('creator', '-password -emailVerified -mobileDeviceToken -webDeviceToken -createdAt -updatedAt -__v')

        return NextResponse.json({ message: "taskboards", data: taskBoards })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}