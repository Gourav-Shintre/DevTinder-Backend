import jwt from 'jsonwebtoken'
import { User } from '../models/usser.model.js';

export const authCheck = async(req, res, next)=> {
    try{
        const {accessToken} = req.cookies;

        if(!accessToken){
            return res.status(401).send({message : 'token is missing'})
        }

        // jwt.verify throws if the token is invalid or expired,
        // so the catch below handles those cases
        const decode = jwt.verify(accessToken, "gourav");

        const user = await User.findById(decode.id)
        if(!user){
            return res.status(401).send({message : 'user not found'})
        }

        req.user = user;   // make the logged-in user available to the route handlers
        next()

    }catch(e){
        return res.status(401).send({message : e.message})
    }
}
