import { sqliteDataSource } from "./data-source"
import express, { Router } from "express";
import { Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";
import { User } from "./model/User"

// Application bootstrap, setting up typeorm
sqliteDataSource.initialize().then(async () => {

    console.log("Starting a connection with the database...")


    // The rest of application bootstrap (express etc)
    const app = express();

    // We use this to be able to parse the body of a request
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get("/", (request: Request, response: Response) => {
        response.send("Hello World!");
    });

    app.use(router);

    app.listen(3000, () => {
        console.log("Listening on port 3000");
});

}).catch(error => console.log(error))







