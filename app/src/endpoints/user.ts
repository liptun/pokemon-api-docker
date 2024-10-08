import { Router } from "express";
import z from "zod";
import { prisma } from "src/app";
import { sha256 } from "src/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const userRouter = Router();

userRouter.get("/user", async (_req, res) => {
    const users = await prisma.user.findMany({ select: { id: true, name: true } });
    res.json(users);
});

userRouter.post("/user", async (req, res) => {
    const payloadSchema = z
        .object({
            name: z.string(),
            password: z.string().min(8, "Password is to short"),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);
        validatePayload.password = sha256(validatePayload.password);
        const user = await prisma.user.create({ data: validatePayload });
        res.json(user);
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
            res.status(409).json({ ...e, message: "This user name is not available" });
        } else {
            res.status(500).json(e);
        }
    }
});

userRouter.delete("/user/:id", async (req, res) => {
    const idSchema = z.number().min(1);
    try {
        const id = idSchema.parse(parseInt(req.params.id));
        const user = await prisma.user.delete({ where: { id } });
        res.status(204).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});
