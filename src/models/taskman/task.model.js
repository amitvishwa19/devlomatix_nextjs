import mongoose from "mongoose";
import { number } from "zod";


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
        },
        slug:{
            type:String,
        },
        description:{
            type:String,
        },
        status:{
            type:String,
        },
        priority:{
            type:String,
        },
        progress:{
            type:Number
        },
        board:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'TaskBoard'
        },
        piller:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'TaskPiller'
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    },{timestamps:true}
)



export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)