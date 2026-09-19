import express from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { signupSchema } from '../utlis/signupVaidation.js';
import { User } from '../models/usser.model.js';
const router = express.Router();

// strip the password hash before sending a user to the client
const toSafeUser = (user) => {
    const { password, ...safeUser } = user.toObject();
    return safeUser;
}

//register
router.post('/signup', validateData(signupSchema),async(req,res)=>{
    console.log(req.body);
    
    const {password } = req.body
    const hashedPassword = await bcrypt.hash(password,10);
    req.body.password = hashedPassword
    console.log(hashedPassword,"hashedPassword")
    const user = new User(req.body);

try{
    await user.save()
    return res.status(201).json({message : 'user Registered successfully', data : toSafeUser(user)})

}catch(e){
    return res.status(400).send({message : e.message})
}
})


//login
router.post('/login',async(req, res)=>{

    try {
        const {password , emailId} = req.body

    const user = await User.findOne({emailId : emailId});

    if(!user){
        return res.status(404).send({message : 'user not found'})
    }
    const isCorrect = await bcrypt.compare(password ,user.password )

    if(!isCorrect){
        return res.status(400).send({message :"incorrect Password"})
    }
    let accessToken = jwt.sign({id : user._id},'gourav',{ expiresIn: '1d' })
    res.cookie('accessToken',accessToken)

    return res.send({message : "User logged in successfully", data : toSafeUser(user)})

    } catch (error) {
        return res.status(500).send({message : error.message})
    }
})

// logout only clears the cookie, so it does not need authCheck —
// this lets a user with an expired token still log out cleanly
router.post('/logout',async(req,res)=>{
    try{
        res.clearCookie('accessToken')
        res.status(200).send({message: "User Logged Out Successfully"})
    }
    catch(e){
        res.status(400).send({message : e.message})
    }
})

export default router;