import { Repository } from "typeorm";
import AppDataSource from "../../../../database/dataSource";
import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ where: { name: name } });

    return specification;
  }
}

export { SpecificationRepository };
