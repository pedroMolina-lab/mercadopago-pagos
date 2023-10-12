import type { NextApiRequest, NextApiResponse } from "next";
import jwt  from "jsonwebtoken";
import {Auth} from "models/auth"
import isAfter from "date-fns/isAfter";

export default async function (req: NextApiRequest, res: NextApiResponse){
   const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code)
   
   if(!auth){
       res.status(401).send({
           message: "email o code incorrecto"
        })
    }
   const expires = auth.isCodeExpired()
   if(expires){
    res.status(401).send({
        message: "code expired"
    })
}
var token = jwt.sign({userId: auth.data.userId}, process.env.JWT_SECRET)
    res.send({token})
}