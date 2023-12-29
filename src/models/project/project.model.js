import mongoose from "mongoose";


const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,

        },
        description:{
            type:String,
            maxlength: 200,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

    },{timestamps:true}
)



export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)