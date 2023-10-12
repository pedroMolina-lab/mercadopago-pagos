import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";

export default async function(req: NextApiRequest, res: NextApiResponse ){

const results = await sendCode(req.body.email, req.body.name, req.body.lastName, req.body.address)

res.send(results)
}