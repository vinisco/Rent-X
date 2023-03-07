import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private Repository: ICarsRepository,
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const all = await this.Repository.listAvailable({
      category_id,
      brand,
      name,
    });

    return all;
  }
}

export { ListAvailableCarsUseCase };
