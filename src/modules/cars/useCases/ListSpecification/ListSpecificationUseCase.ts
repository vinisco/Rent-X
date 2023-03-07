import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    const all = await this.specificationsRepository.list();

    return all;
  }
}

export { ListSpecificationUseCase };
