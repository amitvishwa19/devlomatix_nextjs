import { ApiError } from '@/utils/apiError';
import { asyncHandler } from '@/utils/asyncHandler'
import { mongoConnect } from "@/utils/db";
import { TaskBoard } from '@/models/taskman/taskboard.model';
import { Board } from "@/models/taskman/board.model";

mongoConnect()

async function getTaskBoards(){
    try {
        const taskBoards = await Board.find().populate('creator','-password -emailVerified -mobileDeviceToken -webDeviceToken -createdAt -updatedAt -__v')
        //const taskBoards = await TaskBoard.find()
        return taskBoards;
    } catch (error) {
        return {}
    }

}

async function createTaskBoard(data){
    // const payload = await request.json()
    // console.log('v1 new taskboard controller')
}


export {
    getTaskBoards,
    createTaskBoard
}
