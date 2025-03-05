import { Router } from "express";
import {
  googleLogin,
  isAccountAuthanticated,
  login,
  logout,
  passwordReset,
  register,
  resendOTP,
  verifyEmail,
  verifyOTP,
} from "../controllers/user.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google-auth", googleLogin);
authRouter.get("/logout", logout);
authRouter.post("/google-auth", googleLogin);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/verify-account", isAccountAuthanticated);
authRouter.post("/send-reset-otp", resendOTP);
authRouter.post("/reset-password", passwordReset);

export default authRouter;
