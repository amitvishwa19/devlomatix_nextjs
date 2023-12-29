import mongoose from "mongoose";
import { number } from "zod";

const patientSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    diagonsed: [
        {
            type: String,
            required: true
        }
    ],
    address: [
        {
            type: String,
            required: true
        }
    ],
    age: {
        type: number,
        required: true
    },
    bloodGroup: {
        type: number,
        required: true
    },
    gender: {
        type: number,
        enum: ['male', 'female', 'other'],
        required: true
    },
    admited: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }


}, { timestamps: true })



export const Patient = mongoose.model('Patient', patientSchema)