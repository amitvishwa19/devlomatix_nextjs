import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema(
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
        link:{
            type:String,
            required: true,
        },
        icon:{
            type:String,
            required: true,
        },
        parent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Menu'
        },
    },{timestamps:true}
)



export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema)