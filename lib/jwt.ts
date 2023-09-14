import jwt from "jsonwebtoken";

export function generate(obj){
    return jwt.sign({userId: "1234"}, process.env.JWT_SECRET)
}

export function decode(token){
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
        
    }catch(e){
        console.error("token incorrecto desde jwt")
        return null
    }
}