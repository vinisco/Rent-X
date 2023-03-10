import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.is_admin === false) {
    throw new AppError("User is not an administrator", 403);
  }

  next();
}
