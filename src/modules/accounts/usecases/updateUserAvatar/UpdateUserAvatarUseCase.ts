import { IUpdateUserAvatar } from "../../dtos/IUpdateUserAvatar";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { deleteFile } from "../../../../utils/file";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: IUpdateUserAvatar): Promise<void> {
    const user = await this.userRepository.findById(data.id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = data.avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
