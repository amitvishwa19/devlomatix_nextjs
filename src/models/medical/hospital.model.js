import mongoose from "mongoose";
import { number } from "zod";

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    addressLine:{
        type:String,
        require:true
    },
    speciality:[
        {
            type:String
        }
    ],
    doctors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Doctor'
        }
    ],
    beds:{
        type:number,
        default:0
    }

}, { timestamps: true })



export const Hospital = mongoose.model('Hospital', hospitalSchema)