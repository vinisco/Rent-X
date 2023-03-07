import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({
    expected_return_date,
    user_id,
    car_id,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable", 403);
    }

    const user = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (user) {
      throw new AppError("There is a rental in progress for this user", 403);
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare > minimumHour) {
      throw new AppError("There maximum expected return date is 24 hours", 403);
    }

    const rental = await this.rentalsRepository.create({
      expected_return_date,
      user_id,
      car_id,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
