import { sqliteDataSource } from "../data-source";
import { Account } from "../model/Account";
import { User } from "../model/User";
import { hash } from "bcryptjs"; // Password hasher that generates and includes salt


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
            // deliver error as json response
            throw new Error("user already registered")
        }

        const hashedPassword = await hash(password, 8);

        // Creating a user instance
        const user = new User(name, login, hashedPassword, totalAccounts, accounts); 

        // Save it to the DB
        await userRepository.save(user);

        // Return http response with created object
        // Find a way to not returned hashed password back
        return user;
    }
}

export { CreateUserService };