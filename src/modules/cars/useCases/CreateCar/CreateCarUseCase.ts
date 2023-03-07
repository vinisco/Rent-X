import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  available?: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}
  async execute({
    description,
    name,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const categoryAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (categoryAlreadyExists) {
      throw new AppError(`Car ${license_plate} already exists`, 403);
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
