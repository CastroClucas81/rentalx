import { Repository } from "typeorm";
import AppDataSource from "../../../../database/dataSource";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { hash } from "bcrypt";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<void> {
    const passwordHash = await hash(data.password, 8);

    const user = this.repository.create({
      ...data,
      password: passwordHash,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }
}

export { UserRepository };
