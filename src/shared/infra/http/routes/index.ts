import { Router } from "express";

import authenticationRoutes from "./authenticate.routes";
import carsRoutes from "./cars.routes";
import categoriesRoutes from "./categories.routes";
import specificationsRoutes from "./specifications.routes";
import usersRoutes from "./users.routes";
import rentalsRoutes from "./rentals.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/session", authenticationRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);

export { router };
