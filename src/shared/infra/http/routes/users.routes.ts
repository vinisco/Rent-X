import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";
import ensureAuthentication from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.use(ensureAuthentication);

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

export default usersRoutes;
