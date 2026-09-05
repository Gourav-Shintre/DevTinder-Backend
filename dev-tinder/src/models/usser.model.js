import mongoose from "mongoose";
import validator from "validator";
const {Schema}= mongoose

const userSchema = new  Schema({
    firstName : {
        type : String ,
        required : true,
        minLength : 3
    },
    lastName : {
        type : String ,
        required: true
    },
    emailId : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true,
        validate (value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }
    },
    userName : {
        type : String
    },
    address : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String ,
        enum : ['male','female','other']
    },
    skills : {
        type : [String]
    },
    photoUrl : {
        type : String ,
        default : "https://placehold.co/400",
        validate (value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL checkn syntax")
            }
        }
    }
},{
    timestamps : true
})
export const User = mongoose.model('User',userSchema);