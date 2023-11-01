import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router"
import corsMiddleware from "../middleware-cors";
import { getAllProducts } from "controllers/products";


async function searchAll(req: NextApiRequest, res: NextApiResponse) {
    try {
        
  
      const product = await getAllProducts();
  
      res.json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  
  }
  
  const handler = method({
    get: searchAll
  });

  const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    return await corsMiddleware(req, res, handler);
  };
  
  export default corsHandler;