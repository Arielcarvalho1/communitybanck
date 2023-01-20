// Declaration merging / method override

// Creating a new type(field) in express's request so that we
// can save session data

// Also edited tsconfig to add: Typeroots: ["src/@types/"]

declare namespace Express {
    export interface Request {
        authUserId: string; // ID of the authenticated user
    }
}