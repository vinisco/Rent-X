import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "@modules/cars/dtos/IFindAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      description,
      name,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async list(): Promise<Car[]> {
    return await this.repository.find();
  }
  async listAvailable(data: IFindAvailableCarsDTO): Promise<Car[]> {
    const new_filters = JSON.parse(JSON.stringify(data));

    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true })
      .andWhere(new_filters)
      .getMany();

    return carsQuery;
  }

  async findByName(name: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ name });
    return car;
  }
  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ id });
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where({ id })
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
