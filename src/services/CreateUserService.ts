import { sqliteDataSource } from "../data-source";
import { Account } from "../model/Account";
import { User } from "../model/User";


interface ICreateUserRequest {
    name: string,
    login: string,
    password: string,
    accounts: Account[],
}

class CreateUserService {
    async execute({name, login, password, accounts}: ICreateUserRequest) {
        const userRepository = sqliteDataSource.getRepository(User);
        const userAlreadyExists = await userRepository.findOneBy({login})
        const totalAccounts = accounts.length; // Getting the total amount of accounts requested

        if(userAlreadyExists) {
            throw new Error("user already registered")
        }

        // Creating a user instance
        const user = new User(name, login, password, totalAccounts, accounts); 

        // Save it to the DB
        await sqliteDataSource.manager.save(user);

        // Return http response with created object
        return user;
    }
}

export { CreateUserService };