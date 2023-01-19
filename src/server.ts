import "express-async-errors" // package to return errors as json. Make sure to import it first
import { sqliteDataSource } from "./data-source"
import express, { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";

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

    // Return all errors to the API as a bad request instead of the console
    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof Error) {
            return response.status(400).json({Error: err.message});
        }

        // In case something else goes terribly wrong return an internal server error
        return response.status(500).json({
            status: "Server error",
            message: "Internal server Error"
        });

    });

    app.listen(3000, () => {
        console.log("Listening on port 3000");
});

}).catch(error => console.log(error))







