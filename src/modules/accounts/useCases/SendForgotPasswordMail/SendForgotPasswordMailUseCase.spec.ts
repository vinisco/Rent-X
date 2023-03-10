import { jest } from "@jest/globals";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let userRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send forgot mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider,
    );
  });

  it("should be able to send forgot password mail", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      is_admin: false,
      name: "Mason Sanchez",
      driver_license: "665160",
      email: "atkozevo@se.ck",
      password: "84610274",
    });

    await sendForgotPasswordMailUseCase.execute("atkozevo@se.ck");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send forgot password from a invalid mail", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("wrong@mail.com"),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to send forgot password mail whit a user token", async () => {
    const generateTokenMail = jest.spyOn(
      userTokensRepositoryInMemory,
      "create",
    );

    await userRepositoryInMemory.create({
      is_admin: false,
      name: "Fanny Holland",
      driver_license: "66516022",
      email: "tekhone@fonriclo.sl",
      password: "846102742",
    });

    await sendForgotPasswordMailUseCase.execute("tekhone@fonriclo.sl");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
