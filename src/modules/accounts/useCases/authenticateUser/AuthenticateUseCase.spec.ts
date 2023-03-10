import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeAll(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayjsDateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "User name Test",
      driver_license: "Driver License Test",
      email: "Email Test",
      password: "Password Test",
      is_admin: false,
    };

    await createUserUseCase.execute({ ...user });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate user with the wrong email", async () => {
    const user: ICreateUserDTO = {
      name: "User name Test 2",
      driver_license: "Driver License Test",
      email: "Email Test 2",
      password: "Password Test",
      is_admin: false,
      id: "User name Test 2",
    };
    await createUserUseCase.execute({ ...user });

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong",
        password: user.password,
      });
    }).rejects.toEqual(new AppError(`Email or password incorrect`, 401));
  });
  it("Should not be able to authenticate user with the wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "User name Test 3",
      driver_license: "Driver License Test 2",
      email: "Email Test 3",
      password: "Password Test",
      is_admin: false,
      id: "User name Test 3",
    };

    await createUserUseCase.execute({ ...user });
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong",
      });
    }).rejects.toEqual(new AppError(`Email or password incorrect`, 401));
  });
  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong",
        password: "wrong",
      });
    }).rejects.toEqual(new AppError(`Email or password incorrect`, 401));
  });
});
