import { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/order";
import { sendEmailMP } from "lib/resend";
import { User } from "models/users";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;

  if (topic == "merchant_order") {
    const order = await getMerchantOrder(id);

    if (order.order_status == "paid") {
      const orderId = order.external_reference;
      const myOrder = new Order(orderId);
      console.log(myOrder);
      
      await myOrder.pull();
      myOrder.data.status = "closed";
      await myOrder.push();

      const user = new User(myOrder.data.userId);

      await user.pull();

      const email = user.data.email;

      await sendEmailMP(email);
    }else{
      console.log("el pago no a sido aprobado");
      
    }
  }

  res.send("ok");
}
