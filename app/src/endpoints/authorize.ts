import jwt from "jsonwebtoken";
import { Router } from "express";
import z from "zod";
import { sha256 } from "../utils";
import { prisma } from "../app";

export const authorizeRouter = Router();

authorizeRouter.post("/authorize", async (req, res) => {
    const payloadSchema = z
        .object({
            name: z.string(),
            password: z.string(),
        })
        .strict();
    try {
        const validatePayload = payloadSchema.parse(req.body);

        const user = await prisma.user.findFirst({ where: { name: validatePayload.name } });

        if (user === null) {
            res.status(401).json({ error: "user not found" });
            return;
        }

        if (user?.password === sha256(validatePayload.password)) {
            const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_SECRET ?? "", { expiresIn: "1h" });
            res.send(token);
        } else {
            res.status(401).send({ error: "incorrect password" });
        }
    } catch (e) {
        res.json(e);
    }
});
