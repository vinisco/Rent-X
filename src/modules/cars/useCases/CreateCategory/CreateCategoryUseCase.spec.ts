import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category if the name already exists", async () => {
    const category = {
      name: "Category name already exists",
      description: "Category name already exists",
    };
    await createCategoryUseCase.execute(category);

    await expect(async () => {
      await createCategoryUseCase.execute(category);
    }).rejects.toEqual(
      new AppError(`Category Category name already exists already exists`, 403),
    );
  });
});
