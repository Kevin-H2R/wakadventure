import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors"
import * as helmet from "helmet"
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { WakaTimeClient, RANGE } from 'wakatime-client';
import * as dotenv from 'dotenv';
import {WakaClient} from "./misc/WakaClient"
import e = require("express");


createConnection().then(async connection => {

    // create express app
    const app = express();
    dotenv.config()
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // const client = new WakaTimeClient(process.env.API_KEY);
    const client = WakaClient.getInstance().getClient();
    app.get("/", async (req: Request, res: Response) => {
        try {
            const userDetails =  await client.getMySummary({dateRange: {startDate: '2020-07-17T00:00:00Z', endDate: '2020-07-17T12:00:00Z'}});
            // const userDetails =  await client.getMyHeartbeats('2020-07-17');
            // const userDetails = await client.getMyStats({ range: RANGE.LAST_7_DAYS })
            // const tsDetails = userDetails.data.filter(c => c.language === 'TypeScript')
            // console.log(tsDetails)
            // console.log(userDetails)
            res.json({ "time": userDetails})
        }
        catch (err) {
            console.log(err.response.data)
        } finally {
            return
        }
    })
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
