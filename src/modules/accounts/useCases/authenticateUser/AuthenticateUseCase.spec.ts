import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "../../../accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeAll(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
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
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User name Test",
        driver_license: "Driver License Test",
        email: "Email Test",
        password: "Password Test",
        is_admin: false,
      };

      await createUserUseCase.execute({ ...user });

      await authenticateUserUseCase.execute({
        email: "wrong",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to authenticate user with the wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User name Test",
        driver_license: "Driver License Test",
        email: "Email Test",
        password: "Password Test",
        is_admin: false,
      };

      await createUserUseCase.execute({ ...user });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong",
        password: "wrong",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
