import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carsExists = await this.carsRepository.findById(car_id);

    if (!carsExists) {
      throw new AppError("Car does not exist", 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    carsExists.specifications = specifications;

    return carsExists;
  }
}

export { CreateCarSpecificationUseCase };
