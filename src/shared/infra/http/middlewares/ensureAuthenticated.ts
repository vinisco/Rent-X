import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";

export default async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token);

    const userTokenRepository = new UserTokensRepository();

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user.user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
