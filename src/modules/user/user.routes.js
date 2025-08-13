import { Router } from "express";
import * as userController from "./user.controller.js";
import * as userValidation from "./user.validation.js";
import { validateRequest } from "../../middleware/validationRequest.js";
import { tokenAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation.registerSchema),
  userController.registerUser
);

router.post(
  "/login",
  validateRequest(userValidation.loginSchema),
  userController.loginUser
);

router.get("/profile", tokenAuth, userController.getUser);

export default router;
