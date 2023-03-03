import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.categoriesRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error(`Specification ${name} already exists`);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
