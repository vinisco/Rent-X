import { Router } from "express";
import multer from "multer";
import ensureAuthentication from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/ListCategory/ListCategoryController";
import ensureAdmin from "../middlewares/ensureAdmin";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.use(ensureAuthentication);
categoriesRoutes.use(ensureAdmin);

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle,
);

export default categoriesRoutes;
