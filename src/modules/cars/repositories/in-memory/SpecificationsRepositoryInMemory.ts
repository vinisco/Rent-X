import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
    return allSpecification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );
    return specification;
  }
  async list(): Promise<Specification[]> {
    const all = this.specifications;
    return all;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
