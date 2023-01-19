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
        let user = new User();

        // Get a connection with the database
        await sqliteDataSource.initialize().then(async () => {
            // Creating a user instance
            // var user = new User(); // maybe make a constructor for this later
            user.name = name;
            user.login = login;
            user.password = password;
            user.totalAccount = 2;
            user.accounts = accounts;

            // Save it to the DB
            console.log("here")
            await sqliteDataSource.manager.save(user);
            console.log("here")


        }).catch(error => console.log(error))
        // we get here if anything goes wrong while dealing with the database

        console.log(user)
        return user;
    }
}

export { CreateUserService };