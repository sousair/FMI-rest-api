import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

createConnection().then(async connection => {

    const app = express();
    app.disable('x-powered-by');
    
    app.use(bodyParser.json());

    Routes.forEach(route => {
        app[route.method](route.route, (req: Request, res: Response, next: Function) => {
            (new(route.controller as any))[route.action](req, res, next);
        });
    });

    app.listen(3001);
    console.log("Server running at port 3001");

}).catch(error => console.log(error));
