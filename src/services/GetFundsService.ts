import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";


class GetFundsService {

    async execute(id: string, authUserId: string) {
        const userRepository = sqliteDataSource.getRepository(User);

        // This comes first in case we don't need to bother and can return fast

        if(!id && !authUserId) {
            throw new Error("No such user")
        }


        // Getting all the info we need before hand. The accounts, funds everything
        let usedId: string; // The id to be used in the lookup
        if (id) {
            usedId = id;

        } else if(authUserId) {
            usedId = authUserId;
        }

        const user = await userRepository.findOne({
            
            where: {
                userId: usedId 
            },

            // This tells typeorm to also list all of this entity's relations
            relations: {
                accounts: true
            }
        });

        /*  Sum all the funds across all accounts
            But before we start working with the user object we check for its existence. */

        if(!user) throw new Error("No such user");

        let totalFunds = 0;

        for(let i=0; i<user.accounts.length; i++) {
            totalFunds += user.accounts[i].accountBalance;
        }

        /**
         * 
         * Depending on how the client is requesting for this resource we respond differently.
         * If they're logged in and looking for their own funds then they get more information.
         * 
         * If they are some third-party looking at someone else's funds then they get less information.
         * 
         * Addicionaly, if the client is authenticated but also provides an ID for
         * funds consultation we prioratize that on top of the request token (session)
         * 
         */

        
        /* In case the user is logged in and checks their funds or is logged in and provides his own id as parameter 
         for some reason */

        if((!id && authUserId) || (id === authUserId)) {

            console.log("here")
            // Building the object to be returned

            const funds = {
                "accounts": user.accounts,
                "totalAccounts": user.totalAccounts,
                "totalFunds": totalFunds
            }

            return funds;
        }

        // In case we got a parameter ID for look up
        if(id && user) {
            console.log("here")
            const funds = {
                "totalFunds": totalFunds
            }

            return funds;
        }


    }

}

export { GetFundsService };