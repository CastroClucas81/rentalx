import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const hasSpecification = await this.specificationRepository.findByName(name);

    if (hasSpecification) {
      throw new AppError("Especificação já cadastrada");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
