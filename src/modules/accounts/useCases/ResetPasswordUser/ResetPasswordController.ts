import { Response, Request } from "express";
import { container } from "tsyringe";

import { ResetPasswordMailUseCase } from "./ResetPasswordMailUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordMailUseCase = container.resolve(
      ResetPasswordMailUseCase,
    );

    const { token } = request.query;

    const { password } = request.body;

    await resetPasswordMailUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordController };
