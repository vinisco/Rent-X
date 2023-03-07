import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  findByCarId(car_id: string): Promise<CarImage[]>;
  findById(id: string): Promise<CarImage>;
  create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
