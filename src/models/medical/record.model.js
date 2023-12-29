import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reportType:{
        type:String
    }

}, { timestamps: true })



export const Record = mongoose.model('Record', recordSchema)