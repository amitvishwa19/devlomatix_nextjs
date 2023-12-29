import mongoose from "mongoose";


const taskPillerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
        },
        slug:{
            type:String,
            maxlength: 50,
            
        },
        description:{
            type:String,
            maxlength: 500,
        },
        status:{
            type:Boolean,
            default: false
        },
        tasks:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Task'
            }
        ],
        board:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'TaskBoard'
        },
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    },{timestamps:true}
)



export const TaskPiller = mongoose.models.TaskPiller || mongoose.model('TaskPiller', taskPillerSchema)