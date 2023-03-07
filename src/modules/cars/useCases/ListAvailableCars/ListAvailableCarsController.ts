import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const { brand, category_id, name } = request.query;

    const all = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return response.json(all);
  }
}

export { ListAvailableCarsController };
