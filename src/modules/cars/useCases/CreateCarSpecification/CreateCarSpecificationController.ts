import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specifications_id } = request.body;
    const { id } = request.params;

    const createSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const cars = await createSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController };
