import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/ListSpecification/ListSpecificationController";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthentication from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.get("/", listSpecificationController.handle);

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.use(ensureAdmin);

specificationsRoutes.post("/", createSpecificationController.handle);
export default specificationsRoutes;
