import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import { Order } from "models/order";
import method from "micro-method-router"
import { getOrder } from "controllers/orderController";


async function GetOrderHandler(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const orders = await getOrder(token.userId); 
      res.json(orders); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las órdenes.' });
    }
  }
  
const handler = method({
    get: GetOrderHandler
})


export default authMiddleware(handler);
