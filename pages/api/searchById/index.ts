import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router"
import * as yup from "yup"
import { searchProductById } from "controllers/products";


const idSchema =yup
  .object()
  .shape({
    id: yup.string().min(10),
  })
  .noUnknown(true)
  .strict();

async function searchByid(req: NextApiRequest, res: NextApiResponse) {
    try {
        await idSchema.validate(req.query);
        const { id } = req.query;
  
      const product = await searchProductById(id as string);
  
      res.json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  const handler = method({
    get: searchByid
  });
  
  export default handler;