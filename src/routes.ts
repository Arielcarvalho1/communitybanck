import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();
const createUserController = new CreateUserController();

router.post("/api/v1/user", createUserController.handle);

export { router };