import { compare } from "bcryptjs";
import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";
import { sign } from "jsonwebtoken";


interface IAuthenticateRequest {
    login: string,
    password: string
}

class AuthenticateUserService {

    async execute({login, password}: IAuthenticateRequest) {
        const userRepository = sqliteDataSource.getRepository(User);
        const user = await userRepository.findOneBy({login}); // We check if the user exists first

        if(!user) {
            throw new Error("Login/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password as string);

        if(!passwordMatch) {
            throw new Error("Login/Password incorrect");
        }

        // Successfuly authenticated

        const token = sign(
            {
                login: user.login,
            }, "0cf0607937013cb58d79a7d3c59d4e11", // Private key, a secretword. Here I hashed it
            {
                subject: user.userId,
                expiresIn: "1d" // This token will expire in one day
            }
        )

        return token;

    }

}

export { AuthenticateUserService };