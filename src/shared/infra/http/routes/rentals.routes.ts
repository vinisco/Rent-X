import { Router } from "express";

import ensureAuthentication from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.use(ensureAuthentication);

rentalRoutes.post("/", createRentalController.handle);

export default rentalRoutes;
