import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Cadê o token?", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "c568ca615d0ff8c4e8c8e1230e8155cf"
    ) as IPayload;

    const repository = new UserRepository();

    const user = await repository.findById(user_id);

    if (!user) {
      throw new AppError("O usuário não existe!", 401);
    }

    request.user = {
      id: user_id
    };

    next();
  } catch (error) {
    throw new AppError("Token inválido!", 401);
  }
};

export { ensureAuthenticated };
