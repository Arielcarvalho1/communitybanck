import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class GetUserController {

    async handle(request: Request, response: Response) {
        const userId = request.params.id.split(":")[1]; // The ID without the ":"
        const getUserService = new GetUserService();

        const user = await getUserService.execute(userId);

        response.json(user);
    }


}

export { GetUserController };