import { Specification } from "../../model/Specification";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListSpecificationUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute(): Specification[] {
    const all = this.categoriesRepository.list();

    return all;
  }
}

export { ListSpecificationUseCase };
