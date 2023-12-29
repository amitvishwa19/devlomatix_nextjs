import mongoose from "mongoose";


const roleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            unique: true,
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
        type:{
            type:String,
        },
        permissions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Permission'
            }
        ],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    },{timestamps:true}
)



export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema)