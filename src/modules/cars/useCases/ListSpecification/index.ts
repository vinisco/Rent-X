import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listSpecificationUseCase = new ListSpecificationUseCase(
  categoriesRepository,
);

const listSpecificationController = new ListSpecificationController(
  listSpecificationUseCase,
);

export { listSpecificationUseCase, listSpecificationController };
