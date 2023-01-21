import { sqliteDataSource } from "../data-source";
import { Account } from "../model/Account";
import { User } from "../model/User";


interface IDepositFundsRequest {
    accountNumber: number,
    amount: number
}

class DepositFundsService {

    async execute({accountNumber, amount}: IDepositFundsRequest, userId: string) {
        const amountInt = amount as number;
        const userRepository = sqliteDataSource.getRepository(User);
        const accountRepository = sqliteDataSource.getRepository(Account);

        // Making sure we receive actual numbers (integers)

        if(typeof(amount) !== "number") {
            throw new Error("Please insert integer numbers only");
        }

        if(amountInt % 1 !== 0) {
            throw new Error("Please insert integer numbers only");
        }

        /**
         * Getting all the accounts the user owns and saving them in a new constant so we
         * can work with them more easily
         */

        const user = await userRepository.findOne({
            where: {
                userId: userId
            },
            
            relations: {
                accounts: true
            }
        });

        const accounts = user.accounts;
        let account: Account;


        /** 
         * Go through all the accounts the logged in user owns and check if the number matches the one we were given
         * If it does then we update the account balance with the sum we were given into the database
         * and we return the newly edited account. 
        */

        for(let i = 0; i < accounts.length; i++) {
            const intAcNumber: number = + accounts[i].accountNumber // convert account number from string to int

            if(intAcNumber === accountNumber) {
                account = accounts[i]
            }

        }

        // In case no account matches the provide number than the account doesn't exist or the user doesn't own it

        if(!account) {
            throw new Error("No such account");
        }
        
        const newAmount = account.accountBalance = account.accountBalance + amount; // Update the amount (sum)


        // Update the database table and column where the account number matches the one requested

        await accountRepository.update(accountNumber, {
            accountBalance: newAmount
        });

        return account;         // Newly edited

    }

}

export { DepositFundsService };