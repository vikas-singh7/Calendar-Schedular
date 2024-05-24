const mongoose = require("mongoose")

const { Schema } = mongoose;


const PostSchema = new Schema({
    ownerId:{
        type : String,
    },
    postContent:{
        type:String
    },
    Comments:{
        type: Array
    },
    Likes:{
        type:Number,
        default: 0
    }
});

