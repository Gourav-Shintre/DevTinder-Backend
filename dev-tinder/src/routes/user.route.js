import express from 'express';
import { authCheck } from '../middleware/auth.middleware.js';
import { User } from '../models/usser.model.js';
const router = express.Router();

router.get('/feed',authCheck,async(req,res)=>{
    const data =await User.find()
    console.log(data,"data")
    res.send({message : 'data fetched successfully',data})
})

router.get('/getbyEmailId',authCheck,async(req,res)=>{
    try {
        // const cookies = req.cookies

        // const {token} = cookies

        // if(!token){
        //     res.status(401).send('unauthorized or invalid token')
        // }

        // console.log(token,"token")

        const userEmail = req.body.emailId;
        // const userId= req.body.userId
        const data = await User.find({emailId: userEmail})
        // const data = await User.findById(userId)

        if(data.length <=0){
            res.status(404).send('user not found')
        }else{

            res.send({message : "user data fetched successfully",data})
        }

    } catch (error) {
        res.status(400).send(error,'something went wrong')
    }
})

router.delete('/deleteByEmailId',async(req, res)=>{
    try {
        const userId= req.body.emailId;
        const data = await User.deleteOne({emailId : userId})
        const data1 = await User.findOne({emailId : userId})
        console.log(data1)
        res.send({message: 'user deleted successfully',data})
        
    } catch (error) {
        res.send(error,'something went wrong')
        
    }
})

router.patch('/updateById/:userId',async(req,res)=>{
    try {
         
        const userId = req.params.userId ||req.body.userId;
        console.log(userId,"ID")
        const userInfo = req.body
        const alowedEdits = ['firstName' , 'lastName','age','skills',"emailId"];
        const updates = Object.keys(userInfo).every((k)=>
            alowedEdits.includes(k)
        )
        if(!updates){
            throw new Error('some fields are not allowed to update');
        }
        const data =await User.findByIdAndUpdate(userId , userInfo ,{returnDocument : 'after'})
        res.send({message : 'user updated successfully',data})
        
    } catch (error) {
        res.send(error+'something went wrong')
    }
})

router.put('/updateByEmailId',async(req,res)=>{
    try {
const emaiId = req.body.emailId;
const userInfo = req.body;

const data = await User.findOneAndUpdate({emailId : emaiId},userInfo ,  {returnDocument : 'after'})
res.send({message : 'user updated successfully',data})
        
    } catch (error) {
        res.send(error,'something went wrong')
    }

})

router.get('/',authCheck,async(req,res)=>{
    try{
        const id =req.user.id
    
        const userData = await User.findById(id)
    
        if(!userData){
            res.status(404).send('user not found')
        }
        res.send({message : 'user data fetched successfully',data :userData})
    }catch(e){
        res.status(400).send({message : e.message})
    }


})
export default router;