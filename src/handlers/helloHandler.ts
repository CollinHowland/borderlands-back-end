import express, { Request, Response } from "express";
import * as HelloService from "../services/helloService";
import { getDriver } from "../gateways/neo4jGateway"

export const helloHandler = express.Router()

helloHandler.get("/", (req: Request, res: Response) => {
    try {
        const helloMessage = HelloService.sayHello()
        res.status(200).send(helloMessage)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

helloHandler.get("/neo", (req: Request, res: Response) => {
    const session = getDriver().session()
    
    const personName = "Alice"
    session
        .run (
            'CREATE (a:Person {name: $name}) RETURN a',
            { name: personName }
        )
        .then((result) => {
            console.log("successfully created person")
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            session.close()
        })
    res.status(200).send("It Works")
});

// helloHandler.get("/", async (req: Request, res: Response) => {
//     try {
//         const helloMessage = await HelloService.sayHello()
//         res.status(200).send(helloMessage)
//     } catch (e) {
//         res.status(404).send(e.message)
//     }
// });