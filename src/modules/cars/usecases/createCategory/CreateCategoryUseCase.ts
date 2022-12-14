import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new AppError("A categoria já existe");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
