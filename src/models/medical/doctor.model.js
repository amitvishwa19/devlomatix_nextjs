import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
    },
    qualification:{
        type:String,
        required:true,
    },
    experience:{
        type: number,
        default: 0
    },
    associated:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hospital'
        }
    ]

}, { timestamps: true })



export const Doctor = mongoose.model('Doctor', doctorSchema)