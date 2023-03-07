import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  images_name: string[];
  car_id: string;
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
  ) {}
  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async image_name => {
      await this.carImagesRepository.create({ car_id, image_name });
    });
  }
}

export { UploadCarImagesUseCase };
