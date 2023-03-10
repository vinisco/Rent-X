import date from "date-and-time";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

let listRentalsUseCase: ListRentalsByUserUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Devolution Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    listRentalsUseCase = new ListRentalsByUserUseCase(
      rentalsRepositoryInMemory,
    );
  });

  it("Should be able to return a rental", async () => {
    const rental: ICreateRentalDTO = {
      car_id: "111",
      expected_return_date: new Date(),
      user_id: "111",
    };

    const newRental = await rentalsRepositoryInMemory.create(rental);

    const all = await listRentalsUseCase.execute({
      user_id: newRental.user_id,
    });

    expect(all.length).toBe(1);
  });
});
