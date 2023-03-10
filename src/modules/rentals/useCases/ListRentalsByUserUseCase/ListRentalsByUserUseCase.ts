import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ) {}
  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);
    return rentals;
  }
}

export { ListRentalsByUserUseCase };
