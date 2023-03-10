import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticationRoutes.post("/", authenticateUserController.handle);
authenticationRoutes.post("/refresh-token", refreshTokenController.handle);

export default authenticationRoutes;
