import { Request, Response } from "express";
import { GetFundsService } from "../services/GetFundsService";


class GetFundsController {

    async handle(request: Request, response: Response) {
        let id = request.params.id;
        const getFundsService = new GetFundsService();
        let authUserId = undefined;
        
        if(request.authUserId) {
            authUserId = request.authUserId
        }


        // Removing the ":" that comes with URI parameters

        if(id) {
            id = id.split(":")[1]
        }

        const funds = await getFundsService.execute(id, authUserId);

        return response.json(funds);
    }

}

export { GetFundsController };