import express, { Request, Response } from "express";
import * as HelloService from "../services/helloService";

export const helloHandler = express.Router()

helloHandler.get("/", (req: Request, res: Response) => {
    try {
        const helloMessage = HelloService.sayHello()
        res.status(200).send(helloMessage)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

// helloHandler.get("/", async (req: Request, res: Response) => {
//     try {
//         const helloMessage = await HelloService.sayHello()
//         res.status(200).send(helloMessage)
//     } catch (e) {
//         res.status(404).send(e.message)
//     }
// });