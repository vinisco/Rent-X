import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = {
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
    };

    const carAvailable = {
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      available: true,
    };

    await carsRepositoryInMemory.create(car);
    await carsRepositoryInMemory.create(carAvailable);

    const all = await listCarsUseCase.execute({});

    expect(all.length).toBe(2);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = {
      name: "Car Test one",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
    };

    const carAvailable = {
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      available: true,
    };

    await carsRepositoryInMemory.create(car);
    await carsRepositoryInMemory.create(carAvailable);

    const all = await listCarsUseCase.execute({ name: "Car Test one" });

    expect(all.length).toBe(1);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = {
      name: "Car Test one",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test 1",
      category_id: "category_id",
    };

    const carAvailable = {
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category_id",
      available: true,
    };

    await carsRepositoryInMemory.create(car);
    await carsRepositoryInMemory.create(carAvailable);

    const all = await listCarsUseCase.execute({ brand: "Car Brand Test 1" });

    expect(all.length).toBe(1);
  });
  it("Should be able to list all available cars by category_id", async () => {
    const car = {
      name: "Car Test one",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test 1",
      category_id: "category_id",
    };

    const carAvailable = {
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 1,
      license_plate: "123123",
      fine_amount: 10,
      brand: "Car Brand Test",
      category_id: "category test",
      available: true,
    };

    await carsRepositoryInMemory.create(car);
    await carsRepositoryInMemory.create(carAvailable);

    const all = await listCarsUseCase.execute({ category_id: "category test" });

    expect(all.length).toBe(1);
  });
});
