import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    const rental = await listRentalsByUserUseCase.execute({
      user_id,
    });

    return response.status(201).json(rental);
  }
}

export { ListRentalsByUserController };
