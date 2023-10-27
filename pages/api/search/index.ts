import type { NextApiRequest, NextApiResponse } from "next";
import { getoOffsetAndLimitFromReq } from "controllers/products";
import method from "micro-method-router"
import { searchProduct } from "controllers/products";
import * as yup from "yup"
import corsMiddleware from "../middleware-cors";

const querySchema = yup.object().shape({
  q: yup.string().required().min(2, "debe contener mas de 2 caracteres"),
});

async function search(req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getoOffsetAndLimitFromReq(req, 100, 1000);

  try {
    await querySchema.validate(req.query, { abortEarly: false });

    const searchResult = await searchProduct(req, limit, offset);
    res.send({ searchResult });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}


const handler = method({
    get: search
})

const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await corsMiddleware(req, res, handler);
};


export default corsHandler
