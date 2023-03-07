import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    await this.repository.save(rental);

    return rental;
  }

  async list(): Promise<Rental[]> {
    return await this.repository.find();
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ user_id });
    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ car_id });
    return rental;
  }
}

export { RentalsRepository };
