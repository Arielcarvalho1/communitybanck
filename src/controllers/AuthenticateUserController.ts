import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const { login, password } = request.body;
        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({login, password}); // no await made async-json-erro fail

        return response.json(token);
    }

}

export { AuthenticateUserController };