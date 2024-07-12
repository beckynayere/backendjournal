import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";


const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", [checkJwt], UserController.getProfile);
router.put("/profile", [checkJwt], UserController.updateProfile);

export default router;
