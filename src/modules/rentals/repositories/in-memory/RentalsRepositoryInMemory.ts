import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(c => c.user_id === user_id && !c.end_date);
    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(c => c.car_id === car_id && !c.end_date);
    return rental;
  }
  async list(): Promise<Rental[]> {
    const all = this.rentals;
    return all;
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
      end_date,
      id,
      total,
    });
    this.rentals.push(rental);
    return rental;
  }
  async findById(rental_id: string): Promise<Rental> {
    const rental = this.rentals.find(rental => rental.id === rental_id);
    return rental;
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = this.rentals.filter(rental => rental.user_id === user_id);
    return rental;
  }
}

export { RentalsRepositoryInMemory };
