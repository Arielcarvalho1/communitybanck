import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    // Check for token
    if(!token) {
        return response.status(401).end(); // Forbidden
    }


    const [bearer, tokenString] = token.split(" ");

    try {
        const decoded = verify(tokenString, "0cf0607937013cb58d79a7d3c59d4e11") as IPayload; 

        // We retrieve the userId that we saved on subject uppon authentication
        const subject = decoded.sub;

        // Saving the content of subject(the user id) to the body of every request this user does while authenticated
        // This is a custom field I created by using declaration merging. (see src/@types/express)

        request.authUserId = subject; // Authenticated user id
    
    } catch(err) {
        return response.status(401).end();
    }

    return next(); // Move forward to authentication
}

export { ensureAuthenticated };