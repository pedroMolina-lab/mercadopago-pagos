import type { NextApiRequest, NextApiResponse } from "next";
import { CreatePreference } from "lib/mercadopago";
import { Order } from "models/order";
import { searchProductById } from "./products";
import { firestore } from "lib/firestore";

type createOrderRes = {
  url: string
}

const coll = firestore.collection("order")

export async function createOrder(userId: string, productId:string, aditionalInfo?): Promise <createOrderRes> {
    const product =  await searchProductById(productId)

    if(!product){
        throw "el prod no existe"
    }
    const order = await Order.createNewOrder({
        aditionalInfo: aditionalInfo,
        productId,
        userId: userId,
        status: "pending"
    })
    
    
   const pref = await CreatePreference({
        
    external_reference: order.id,
    
    items: [
      {
        "title": product['Name'],
        "description": "Dummy description",
        "picture_url": "http://www.myapp.com/myimage.jpg",
        "category_id": "car_electronics",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": parseFloat(product['Unit cost'])
      }
    ],
    "back_urls": {
        "success": "https://apx.school.com",
        
    },
    notification_url: "vercel-public-directory-two.vercel.app/webhooks/mercadopago",
  })
      
  
  
  return {
    url: pref.init_point 
  } 
    
}

export async function getOrder(userId){
  const orderGet = coll.where("userId", "==", userId)
  const snapShot = await orderGet.get()

  const orders = []
  snapShot.forEach((doc)=>{
    const orderData = doc.data()
    orders.push(orderData)
  })
  return orders
}

export async function getOrderById(userId, productId){
  const orderGet = coll.where("userId", "==", userId).where("productId", "==", productId)
  const snapShot = await orderGet.get()

  const orders = []
  snapShot.forEach((doc)=>{
    const orderData = doc.data()
    orders.push(orderData)
  })
  return orders
}