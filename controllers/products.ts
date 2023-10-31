import type { NextApiRequest, NextApiResponse } from "next";
import { productIndex } from "lib/algolia";
import { Product } from "models/product";


export function getoOffsetAndLimitFromReq(
  req: NextApiRequest,
  maxLimit,
  maxOffset
) {
  const queryLimit = parseInt(req.query.limit as string);
  const queryOffset = parseInt(req.query.offset as string);
  console.log(queryLimit);

  const limit = queryLimit <= maxLimit ? queryLimit : maxLimit;
  const offset = queryOffset <= maxOffset ? queryOffset : 0;

  return {
    limit,
    offset,
  };
}

export async function searchProduct(
  req: NextApiRequest,
  limit: number,
  offset: number
) {
  const results = await Product.search(req.query.q as string);
  const products = results.hits;

  return {
    limit,
    offset,
    products
  };
}

export async function searchProductById(id: string) {
  const results = await productIndex.search("");

  const product = results.hits.find((item) => item.objectID === id);

  if (product) {
    return product;
  } else {
    throw new Error(`No se encontró ningún producto con el ID: ${id}`);
  }
}
