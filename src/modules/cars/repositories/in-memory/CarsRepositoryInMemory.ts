import { IFindAvailableCarsDTO } from "@modules/cars/dtos/IFindAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByName(name: string): Promise<Car> {
    const car = this.cars.find(c => c.name === name);
    return car;
  }
  async findById(id: string): Promise<Car> {
    const car = this.cars.find(c => c.id === id);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(c => c.license_plate === license_plate);
    return car;
  }
  async list(): Promise<Car[]> {
    const all = this.cars;
    return all;
  }
  async listAvailable({
    brand,
    name,
    category_id,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    let all = this.cars.filter(car => car.available === true);

    if (brand) {
      all = all.filter(car => car.brand === brand);
    }
    if (name) {
      all = all.filter(car => car.name === name);
    }
    if (category_id) {
      all = all.filter(car => car.category_id === category_id);
    }

    return all;
  }
  async create({
    description,
    name,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    available = true,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      available,
      specifications,
      id,
    });
    this.cars.push(car);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex(car => car.id === id);
    this.cars[index].available = available;
  }
}

export { CarsRepositoryInMemory };
