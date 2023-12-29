import mongoose from "mongoose";


const menuSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            unique: true,
        },
        description:{
            type:String,
            maxlength: 200,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'MenuItem'
        },

    },{timestamps:true}
)



export const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema)