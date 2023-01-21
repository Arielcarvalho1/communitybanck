import { Request, Response } from "express";
import { DepositFundsService } from "../services/DepositFundsService";

class DepositFundsController {

    async handle(request: Request, response: Response) {
        const { accountNumber, amount } = request.body;
        const depositFundsService = new DepositFundsService();
        const userId = request.authUserId;

        const account = await depositFundsService.execute({accountNumber, amount}, userId);

        return response.json(account);
    }

}

export { DepositFundsController };