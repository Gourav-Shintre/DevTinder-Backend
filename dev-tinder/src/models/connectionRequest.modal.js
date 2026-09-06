import mongoose from "mongoose";
// import { User } from "./usser.model";
const connectionRequest = new mongoose.Schema({
    fromUserId : {
        required : true,
        ref : 'User',
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        ref : "User",
        required : true,
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        type : String,
        enum : ['interested' , 'rejected' , 'accepted', 'ignored'],
        message : '{value} is incorrect status type'
    }
})

connectionRequest.index({
    fromUserId : 1,
    toUserId : 1
})
export const connectRequestModal =new mongoose.model('connectionRequest',connectionRequest)