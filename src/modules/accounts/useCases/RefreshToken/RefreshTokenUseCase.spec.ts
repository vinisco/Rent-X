import { RefreshTokenUseCase } from "../RefreshToken/RefreshTokenUseCase";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let refreshTokenUseCase: RefreshTokenUseCase;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeAll(() => {
    dayjsDateProvider = new DayjsDateProvider();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    refreshTokenUseCase = new RefreshTokenUseCase(
      userTokensRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("Should be able to authenticate a user", async () => {});
});
