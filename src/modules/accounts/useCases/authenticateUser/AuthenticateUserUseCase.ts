import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      secret_refresh_token,
      secret_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError(`Email or password incorrect`, 401);
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(`Email or password incorrect`, 401);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: expires_date,
      refresh_token,
    });

    return {
      user: { name: user.name, email },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
