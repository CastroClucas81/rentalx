import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/usecases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
userRoutes.post("/", createUserController.handle);

const updateUserAvantarController = new UpdateUserAvatarController();
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  // salvar foto
  uploadAvatar.single("avatar"),
  updateUserAvantarController.handle
);

export { userRoutes };
