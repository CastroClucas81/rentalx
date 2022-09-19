import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from "tsyringe";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    await createSpecificationUseCase.execute({ name, description });

    return response
      .status(201)
      .json({ message: "Cadastro efetuado com sucesso!" });
  }
}

export { CreateSpecificationController };