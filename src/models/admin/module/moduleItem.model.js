import mongoose from "mongoose";

const moduleItemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    icon:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
}, { timestamps: true })



export const ModuleItem = mongoose.model('ModuleItem', moduleItemSchema)