import express from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { signupSchema } from '../utlis/signupVaidation.js';
import { User } from '../models/usser.model.js';
import { authCheck } from '../middleware/auth.middleware.js';
const router = express.Router();

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
    res.send('user Registered successfully',user)

}catch(e){
    res.status(400).send({message : e.message})
}
})


//login
router.post('/login',async(req, res)=>{

    try {
        const {password , emailId} = req.body

    const user = await User.findOne({emailId : emailId});

    if(!user){
        res.status(404).send('user not found')
    }
    const isCorrect = await bcrypt.compare(password ,user.password )

    if(!isCorrect){
        res.status(400).send({message :"incorrect Password"})
    }
    let accessToken = jwt.sign({id : user._id},'gourav',{ expiresIn: '1d' })
    console.log(accessToken)
    res.cookie('accessToken',accessToken)

    res.send({message : "USer logged in successfully"})

    let decode = jwt.verify(accessToken,'gourav')
    console.log(decode,"decode")
        
    } catch (error) {
        res.send({message : error.message})
    }
})

router.post('/logout',authCheck,async(req,res)=>{
    try{
        res.clearCookie('accessToken')
        res.status(200).send({message: "User Logged Out Successfully"})
    }
    catch(e){
        res.status(400).send({message : e.message})
    }
})

export default router;