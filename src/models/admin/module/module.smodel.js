import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    items:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'ModuleItem'
        }
    ]

}, { timestamps: true })



export const Module = mongoose.model('Module', doctorSchema)