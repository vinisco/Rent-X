import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async findById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id: rental_id });
    return rental;
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: { user_id: user_id },
      relations: ["car"],
    });
    return rental;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    total,
    end_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
      id,
      total,
      end_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async list(): Promise<Rental[]> {
    return await this.repository.find();
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ user_id, end_date: null });
    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ car_id, end_date: null });
    return rental;
  }
}

export { RentalsRepository };
