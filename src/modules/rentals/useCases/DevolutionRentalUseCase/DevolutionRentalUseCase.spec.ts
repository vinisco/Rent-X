import date from "date-and-time";

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

let devolutionRentalUseCase: DevolutionRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Devolution Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it("Should be able to return a rental", async () => {
    const car = {
      name: "Car Test one",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
    };

    const createdCar = await carsRepositoryInMemory.create(car);

    const rental: ICreateRentalDTO = {
      car_id: createdCar.id,
      expected_return_date: new Date(),
      user_id: "111",
    };

    const newRental = await rentalsRepositoryInMemory.create(rental);

    await devolutionRentalUseCase.execute({
      rental_id: newRental.id,
      user_id: newRental.user_id,
    });

    expect(!!newRental.end_date).toBeTruthy();
  });
});
