import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private emailProvider: IMailProvider,
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs",
    );

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      expires_date: expires_date,
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.emailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
