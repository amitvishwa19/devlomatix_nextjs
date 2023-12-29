import mongoose from "mongoose";


const permissionSchema = new mongoose.Schema(
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
        roles:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Role'
            }
        ],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    },{timestamps:true}
)



export const Permission = mongoose.models.Permission || mongoose.model('Permission', permissionSchema)