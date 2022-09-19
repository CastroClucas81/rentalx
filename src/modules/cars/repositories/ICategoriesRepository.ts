import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";

// usando interface, liskov
interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  listAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };
