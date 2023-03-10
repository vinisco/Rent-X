import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { UserToken } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  constructor() {
    this.repository = getRepository(UserToken);
  }

  private repository: Repository<UserToken>;

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const user_token = this.repository.create(data);

    await this.repository.save(user_token);

    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const user_token = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return user_token;
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const user_token = await this.repository.findOne({
      refresh_token,
    });
    return user_token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UserTokensRepository };
