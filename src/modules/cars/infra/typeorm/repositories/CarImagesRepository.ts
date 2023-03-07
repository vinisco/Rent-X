import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage> {
    const car = this.repository.create({
      image_name,
      car_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const car = await this.repository.find({ car_id });
    return car;
  }

  async findById(id: string): Promise<CarImage | undefined> {
    const car = await this.repository.findOne({ id });
    return car;
  }
}

export { CarImagesRepository };
