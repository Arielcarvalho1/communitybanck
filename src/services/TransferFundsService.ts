import { EntityTarget } from "typeorm";
import { sqliteDataSource } from "../data-source";
import { Account } from "../model/Account";
import { User } from "../model/User";

interface ITransferFundsRequest {
    fromAccountNumber: number,
    toAccountNumber: string,
    amount: number
}

class TransferFundsService {

    async execute({ fromAccountNumber, toAccountNumber, amount }: ITransferFundsRequest, userId: string) {
        const amountInt = amount as number;
        const accountRepository = sqliteDataSource.getRepository(Account);
        const userRepository = sqliteDataSource.getRepository(User);

        /**
         * Allows you to make a transfer to any account as long as it exists, its not yours and you have the
         * funds to do so.
         */

        // Making sure we're working with integers

        if(typeof(amount) !== "number") {
            throw new Error("Please insert integer numbers only");
        }

        if(amountInt % 1 !== 0) {
            throw new Error("Please insert integer numbers only");
        }

        if(amount < 1) {
            throw new Error("Too few funds")
        }

        // Getting access to the sender user and all his accounts

        const fromUser = await userRepository.findOne({
            where: {
                userId: userId
            },
            relations: {
                accounts: true
            }
        });

        const fromAccounts = fromUser.accounts;
        let fromAccount: Account;

        for(let i = 0; i < fromAccounts.length; i++) {
            const intAcNumber: number = + fromAccounts[i].accountNumber // convert account number from string to int

            if(intAcNumber === fromAccountNumber) {
                fromAccount = fromAccounts[i]
            }

        }

        if(!fromAccount) {
            throw new Error("You do not own this account");
        }

        const fromAccountFunds = fromAccount.accountBalance;

        // Check if sender has the funds

        if(amount > fromAccountFunds) { // What's the point?
            throw new Error("Not enough funds");
        }

        // Getting the receiver account

        const toAccount = await accountRepository.findOne({
            where: {
                accountNumber: toAccountNumber
            },
            relations: {
                accountOwner: true as never // Typecasting to a type the property accepts (there is a User obj there)

            }
        });

        if(!toAccount) {
            throw new Error("No such account");
        }

        if(toAccount.accountOwner.userId == fromUser.userId) {
            throw new Error("Cannot transfer to an account you own");
        }

        const toAccountFunds = toAccount.accountBalance;

        // Taking from one account and adding to the other (in memory)

        const newFromAccountFunds = fromAccountFunds - amount;
        const newToAccountFunds = toAccountFunds + amount;


        // Start a transaction

        await sqliteDataSource.transaction(async (transactionalEntityManager) => {

            /**
             * Making the transfer in a transaction so that if anything goes wrong during it nothing persists.
             * Either it all completes or none of it does.
             */

            // Persist the sender's new funds

            await transactionalEntityManager.update(Account, {      // We have to use the provided transactional entity manager
                accountNumber: fromAccountNumber

            }, {
                accountBalance: newFromAccountFunds
            });

            // Persist the receiver's new funds

            await transactionalEntityManager.update(Account, {
                accountNumber: toAccountNumber 
            }, {
                accountBalance: newToAccountFunds
            });
        });
    
        // With everything completed we now return the edited account (with the updated fund values) to the client

        const editedAccount = {
            "accountNumber": fromAccount.accountNumber,
            "accountBalance": newFromAccountFunds,
            "accountTitle": fromAccount.accountTitle,
            "updated_at": fromAccount.updated_at
        }

        return editedAccount;

    }

}

export { TransferFundsService };