import mongoose from "mongoose";
import { _enum } from "zod/v4/core";

const connectionRequest = new mongoose.Schema({
    fromUserId : {
        require : true,
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        require : true,
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        type : String,
        enum : ['interested' , 'rejected' , 'accepted', 'ignored'],
        message : '{value} is incorrect status type'
    }
})
export const connectRequestModal =new mongoose.model('connectionRequest',connectionRequest)