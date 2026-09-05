import express from 'express';
import { authCheck } from '../middleware/auth.middleware.js';
import { connectRequestModal } from '../models/connectionRequest.modal.js';
import { User } from '../models/usser.model.js';
const router = express.Router();

router.post('/send/:status/:toUserId',authCheck,async(req,res)=>{

    try{
        console.log(req.user.id)
        const fromUserId = req.user.id
        const status = req.params.status
        const toUserId = req.params.toUserId;

        //check user is sending request to himself

        if(fromUserId === toUserId){
            return res.status(400).send({message : 'user can not send request to himself'})
        }



        //check user is present i db or not 

        const userExist =await User.findById(toUserId)

        if(!userExist){
            return res.status(404).send({message : 'user not exist'})
        }
        //check ststus is valid or not

        const allowedStatus = ['interested','ignored']

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : `status is not allowed ${status}`})
        }

        //check reuest is already sent or not
        const existingconnectionReq = await connectRequestModal.findOne({
            $or : [
                {fromUserId , toUserId},
            {fromUserId : toUserId , toUserId : fromUserId}
            ]
        })





        if(existingconnectionReq){
            return res.status(400).send({message : 'connection request already exists'})
        }

        const data = await connectRequestModal.create({
            fromUserId,
            toUserId,
            status
        })

        res.send({message : 'connection request send succesfully', data})

    }catch(e){
        console.error('POST /request/send failed:', e)
        res.status(500).send({message : 'something went wrong', error : e.message})

    }


})

export default router;