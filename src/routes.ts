import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";

const router = Router();
const createUserController = new CreateUserController();
const getUserController =  new GetUserController();

router.post("/api/v1/user", createUserController.handle);
router.get("/api/v1/user:id", getUserController.handle);

export { router };