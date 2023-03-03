import { Router } from "express";
import multer from "multer";

const upload = multer({
  dest: "./tmp",
});

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { listCategoryController } from "../modules/cars/useCases/ListCategory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export default categoriesRoutes;
