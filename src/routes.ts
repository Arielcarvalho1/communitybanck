import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetFundsController } from "./controllers/GetFundsController";
import { GetUserController } from "./controllers/GetUserController";
import { checkAuthenticated } from "./middlewares/checkAuthenticated";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";


const router = Router();
const createUserController = new CreateUserController();
const getUserController =  new GetUserController();
const authenticateUserController = new AuthenticateUserController();
const getFundsController = new GetFundsController();

router.post("/api/v1/user", createUserController.handle);
router.get("/api/v1/user:id", getUserController.handle);
router.post("/api/v1/session", authenticateUserController.handle) // route to login
router.delete("/api/v1/session") // route to logout
router.get("/api/v1/funds:id?", checkAuthenticated, getFundsController.handle);

export { router };