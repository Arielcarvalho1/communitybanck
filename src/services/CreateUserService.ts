import { sqliteDataSource } from "../data-source";
import { Account } from "../model/Account";
import { User } from "../model/User";


interface ICreateUserRequest {
    name: string,
    login: string,
    password: string,
    accounts: Account,
}

class CreateUserService {
    async execute({name, login, password, accounts}: ICreateUserRequest) {
        const userRepository = sqliteDataSource.getRepository(User);
        const userAlreadyExists = await userRepository.findOneBy({login})
        console.log(userAlreadyExists);

        if(userAlreadyExists) {
            throw new Error("user already registered")
        }

        // Creating a user instance
        const user = new User(); // maybe make a constructor for this later
        user.name = name;
        user.login = login;
        user.password = password;
        user.totalAccount = 2;
        user.accounts = accounts;

        // Save it to the DB
        console.log("here")
        await sqliteDataSource.manager.save(user);
        console.log("here")




        console.log(user)
        return user;
    }
}

export { CreateUserService };