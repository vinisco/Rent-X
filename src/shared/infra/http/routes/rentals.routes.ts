import { Router } from "express";

import ensureAuthentication from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/DevolutionRentalUseCase/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/ListRentalsByUserUseCase/ListRentalsByUserController";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalRoutes = Router();

rentalRoutes.use(ensureAuthentication);

rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);
rentalRoutes.get("/", listRentalsByUserController.handle);

export default rentalRoutes;
