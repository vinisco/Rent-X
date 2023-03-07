import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICreateCarImageDTO } from "../../dtos/ICreateCarImageDTO";
import { ICarImagesRepository } from "../ICarImagesRepository";

class CarImagesRepositoryInMemory implements ICarImagesRepository {
  carImages: CarImage[] = [];

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const carImage = this.carImages.filter(c => c.car_id === car_id);
    return carImage;
  }
  async findById(id: string): Promise<CarImage> {
    const carImage = this.carImages.find(c => c.id === id);
    return carImage;
  }

  async create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage, {
      image_name,
      car_id,
    });
    this.carImages.push(carImage);

    return carImage;
  }
}

export { CarImagesRepositoryInMemory };
