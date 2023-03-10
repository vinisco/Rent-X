import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  user_tokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const user_token = new UserToken();

    Object.assign(user_token, {
      ...data,
    });

    this.user_tokens.push(user_token);

    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const user = this.user_tokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );
    return user;
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const user = this.user_tokens.find(
      token => token.refresh_token === refresh_token,
    );
    return user;
  }
  async deleteById(id: string): Promise<void> {
    const index = this.user_tokens.findIndex(token => token.id === id);
    this.user_tokens.splice(0, index);
  }
}

export { UserTokensRepositoryInMemory };
