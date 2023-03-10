import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ token, password }: IRequest) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid", 403);
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError("Token expired", 403);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordMailUseCase };
