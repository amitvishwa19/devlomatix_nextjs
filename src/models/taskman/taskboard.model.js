import mongoose from "mongoose";


const taskBoardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength:100,
            minlength: 1,
        },
        slug:{
            type:String,
            maxlength: 50,
            
        },
        description:{
            type:String,
        },
        status:{
            type:Boolean,
            default: false
        },
        pillers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'TaskPiller'
            }
        ],
        tasks:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Task'
            }
        ],
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        
        
    },{timestamps:true}
)



export const TaskBoard = mongoose.models.TaskBoard || mongoose.model('TaskBoard', taskBoardSchema)