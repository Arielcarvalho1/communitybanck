import { Request, Response } from "express";
import { TransferFundsService } from "../services/TransferFundsService";

class TransferFundsController {

    async handle(request: Request, response: Response) {
        const { fromAccountNumber, toAccountNumber, amount } = request.body;
        const transferFundsService = new TransferFundsService();

        const editedAccount = await transferFundsService.execute({fromAccountNumber, toAccountNumber, amount}, request.authUserId);

        return response.json(editedAccount);
    }

}

export { TransferFundsController };