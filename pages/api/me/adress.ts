import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import { User } from "models/users";
import method from "micro-method-router";
import { updateUser } from "controllers/user";

async function patchHandler(req: NextApiRequest, res: NextApiResponse, token) {
  try {
    if (req.body.email) {
      return res.status(400).send({
        message: "no se puede modificar el email",
      });
    }

    await updateUser(token.userId, req.body); 
    res.status(200).send({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send({
      message: "Error al actualizar",
    });
  }
}

const handler = method({
  patch: patchHandler,
});

export default authMiddleware(handler);
