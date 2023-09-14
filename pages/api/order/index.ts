import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import { User } from "lib/users";
import { Order } from "lib/models/order";
import method from "micro-method-router"
import { CreatePreference } from "lib/mercadopago";

const products = {
    1234:{
        "title": "silla",
        "price": 1000
    }
}


async function Posthandler(req: NextApiRequest, res: NextApiResponse, token) {
    const {productId} = req.query as any
    const product = products[productId]
    
    if(!product){
        res.status(404).json({message: "el producto no existe"})
    }
    const order = await Order.createNewOrder({
        aditionalInfo: req.body,
        productId,
        userId: token.userId,
        status: "pending"
    })
    
    
   const pref = await CreatePreference({
    
    "external_reference": order.id,
    
    items: [
      {
        "title": product.title,
        "description": "Dummy description",
        "picture_url": "http://www.myapp.com/myimage.jpg",
        "category_id": "car_electronics",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": product.price
      }
    ],
    "back_urls": {
      "success": "https://apx.school.com",
      "notification_url": "https://webhook.site/7e54c7ae-1dd4-4f46-b1ae-585b92423e40"
    },
  })
  
  res.send(pref.init_point) 
}

    
const handler = method({
    post: Posthandler
})



export default authMiddleware(handler);
