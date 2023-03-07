import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";

import uploadConfig from "@config/upload";
import ensureAuthentication from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";
import { UploadCarImagesController } from "@modules/cars/useCases/UploadCarImagesUseCase/UploadCarImagesController";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.use(ensureAuthentication);
carsRoutes.use(ensureAdmin);

carsRoutes.post("/", createCarController.handle);
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle);
carsRoutes.post(
  "/images/:id",
  upload.array("images"),
  uploadCarImagesController.handle,
);

export default carsRoutes;
