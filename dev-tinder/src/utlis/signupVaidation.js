import {z} from "zod";

export const signupSchema = z.object({
        firstName : z.string().min(2,'firstname should be atleast 2 characters'),
        lastName : z.string().min(2,'lastname should be atleast 2 characters'),
        emailId : z.string().email('invalid email address'),
        password : z.string().min(8,'password should be atleast 8 characters'),
})