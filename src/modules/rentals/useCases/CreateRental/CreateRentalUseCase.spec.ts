import date from "date-and-time";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it("Should be able to create a new rental", async () => {
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

    const newRental = await createRentalUseCase.execute(rental);

    expect(newRental).toHaveProperty("id");
  });
  it("Should not be able to create a new rental from a car with a open rental", async () => {
    expect(async () => {
      const car = {
        name: "Car Test 2",
        description: "Car description 2",
        daily_rate: 1,
        license_plate: "1231234",
        fine_amount: 10,
        brand: "Car Brand Test",
        category_id: "category_id",
      };

      const createdCar = await carsRepositoryInMemory.create(car);

      const rental: ICreateRentalDTO = {
        car_id: createdCar.id,
        expected_return_date: new Date(),
        user_id: "3333",
      };
      const rental2: ICreateRentalDTO = {
        car_id: createdCar.id,
        expected_return_date: new Date(),
        user_id: "3333",
      };

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(rental2);
    }).rejects.toEqual(new AppError("Car is unavailable", 403));
  });
  it("Should not be able to create a new rental from a user with a open rental", async () => {
    const car = {
      name: "Car Test 1 open",
      description: "Car description 3",
      daily_rate: 1,
      license_plate: "test1",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      id: "Car Test 1 open",
    };

    const car2 = {
      name: "Car Test 2 open",
      description: "Car description 6",
      daily_rate: 1,
      license_plate: "test2",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      id: "Car Test 2 open",
    };

    const createdCar = await carsRepositoryInMemory.create(car);
    const createdCar2 = await carsRepositoryInMemory.create(car2);

    const rental: ICreateRentalDTO = {
      car_id: createdCar.id,
      expected_return_date: new Date(),
      user_id: "33334",
    };
    const rental2: ICreateRentalDTO = {
      car_id: createdCar2.id,
      expected_return_date: new Date(),
      user_id: "33334",
    };

    await createRentalUseCase.execute(rental);

    await expect(async () => {
      await createRentalUseCase.execute(rental2);
    }).rejects.toEqual(
      new AppError("There is a rental in progress for this user", 403),
    );
  });

  it("Should not be able to create a new rental  with a expected return date greater then 24 hours", async () => {
    const now = new Date();
    const tomorrow = date.addDays(now, +2);

    const car = {
      name: "Car Test greater then 24",
      description: "Car description 4",
      daily_rate: 1,
      license_plate: "test greater then",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      id: "Car Test greater then 24",
    };

    const createdCar = await carsRepositoryInMemory.create(car);

    const rental: ICreateRentalDTO = {
      car_id: createdCar.id,
      expected_return_date: tomorrow,
      user_id: "user test greater then 24",
    };

    expect(async () => {
      await createRentalUseCase.execute(rental);
    }).rejects.toEqual(
      new AppError("The maximum expected return date is 24 hours", 403),
    );
  });
});
