import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import method from "micro-method-router"
import { createOrder } from "controllers/orderController";


async function Posthandler(req: NextApiRequest, res: NextApiResponse, token) {
      const {productId} = req.query as any
      
      const {url} = await createOrder(token.userId, productId, req.body)
      res.send({url}) 
}

    
const handler = method({
    post: Posthandler
})



export default authMiddleware(handler);
