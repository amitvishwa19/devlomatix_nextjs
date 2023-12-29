import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:255
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

}, { timestamps: true })

export const SubTodo = mongoose.model('SubTodo', subTodoSchema)