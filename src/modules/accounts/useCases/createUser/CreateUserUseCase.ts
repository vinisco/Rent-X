import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  is_admin: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    driver_license,
    email,
    is_admin,
    name,
    password,
  }: IRequest): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`Email ${name} already exists`, 403);
    }

    await this.usersRepository.create({
      driver_license,
      email,
      is_admin,
      name,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
