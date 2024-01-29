import express from "express";

export const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
    const baseUrl = `${req.protocol}://${req.hostname}`;
    const port = req.socket.localPort;

    const apiUrl = `${baseUrl}${port && `:${port}`}`;
    const prismaStudio = `${baseUrl}:5555`;

    res.json({
        message: "Welcome to Pokemon API",
        apiUrl,
        docs: `${apiUrl}/api-docs`,
        prismaStudio,
    });
});
