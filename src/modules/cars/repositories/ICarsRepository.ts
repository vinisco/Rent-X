import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "../dtos/IFindAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByName(name: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
  listAvailable({
    brand,
    name,
    category_id,
  }: IFindAvailableCarsDTO): Promise<Car[]>;
  create({ name, description }: ICreateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
