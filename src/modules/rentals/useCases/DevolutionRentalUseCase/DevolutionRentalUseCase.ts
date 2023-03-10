import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  user_id: string;
  rental_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}
  async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new AppError("Rental does not exist", 403);
    }

    if (rental.user_id !== user_id) {
      throw new AppError("This rental belongs to another user", 403);
    }

    if (rental.end_date) {
      throw new AppError("Rental is already finished", 403);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
