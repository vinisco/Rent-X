import date from "date-and-time";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("Should be able to create a new rental", async () => {
    const rental: ICreateRentalDTO = {
      car_id: "111",
      expected_return_date: new Date(),
      user_id: "111",
    };

    const newRental = await createRentalUseCase.execute(rental);

    expect(newRental).toHaveProperty("id");
  });
  it("Should not be able to create a new rental from a car with a open rental", async () => {
    expect(async () => {
      const rental: ICreateRentalDTO = {
        car_id: "111",
        expected_return_date: new Date(),
        user_id: "3333",
      };
      const rental2: ICreateRentalDTO = {
        car_id: "111",
        expected_return_date: new Date(),
        user_id: "3333",
      };

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to create a new rental from a user with a open rental", async () => {
    expect(async () => {
      const rental: ICreateRentalDTO = {
        car_id: "1111",
        expected_return_date: new Date(),
        user_id: "3333",
      };
      const rental2: ICreateRentalDTO = {
        car_id: "1111",
        expected_return_date: new Date(),
        user_id: "3333",
      };

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental  with a expected return date grater than 24 hours", async () => {
    expect(async () => {
      const now = new Date();
      const tomorrow = date.addDays(now, +2);

      const rental: ICreateRentalDTO = {
        car_id: "3333",
        expected_return_date: tomorrow,
        user_id: "1111",
      };

      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
