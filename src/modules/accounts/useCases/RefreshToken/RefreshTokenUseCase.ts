import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  token: string;
}

interface IResponse {
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ token }: IRequest): Promise<IResponse> {
    const {
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_refresh_token,
    } = auth;

    const { email, sub } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const users_token =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!users_token) {
      throw new AppError("Refresh Token does not exists", 400);
    }

    await this.usersTokensRepository.deleteById(users_token.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
