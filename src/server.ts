import { sqliteDataSource } from "./data-source"
import express, { Router } from "express";
import { Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";
// import { User } from "./model/User"

/*
AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
*/

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

