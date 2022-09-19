import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDto): Promise<void> {
    const hasUser = await this.userRepository.findByEmail(data.email);

    if (hasUser) {
      throw new AppError("Usuário já existe!");
    }

    await this.userRepository.create(data);
  }
}

export { CreateUserUseCase };
