import { Response, Request } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: rental_id } = request.params;
    const { id: user_id } = request.user;

    const createRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await createRentalUseCase.execute({
      rental_id,
      user_id,
    });

    return response.status(201).json(rental);
  }
}

export { DevolutionRentalController };
