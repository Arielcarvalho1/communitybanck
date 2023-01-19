import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const createUserService = new CreateUserService();
        const {
            name,
            login,
            password,
            accounts
        } = request.body;

        // Request a user instance from the service
        const user = await createUserService.execute({
            name,
            login,
            password,
            accounts
        });

        return response.json(user);
    }

}

export { CreateUserController };