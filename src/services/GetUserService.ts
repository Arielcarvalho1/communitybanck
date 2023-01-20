import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";


class GetUserService {

    async execute(userId: string, id: string) {
        const userRepository = sqliteDataSource.getRepository(User);
        const user:User = await userRepository.findOneBy({userId});

        if(!user) {
            throw new Error("No such user");
        }

        /**
         * We shouldn't return the entire user object since there is sensitive data there
         * such as the login, password etc.
         * So we create a new object with just the information we want to be available and return
         * that instead.
         */

        const newUser = {
            id: user.userId,
            name: user.name,
            totalAccounts: user.totalAccounts,
            auth: id
        };

        console.log(newUser)

        return newUser;
    }

}

export { GetUserService };