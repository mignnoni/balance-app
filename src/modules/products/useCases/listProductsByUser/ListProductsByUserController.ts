import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductsByUserUseCase } from "./ListProductsByUserUseCase";

class ListProductsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const listProductsByUserUseCase = container.resolve(
            ListProductsByUserUseCase
        );

        const products = await listProductsByUserUseCase.execute(id);

        return response.json(products);
    }
}

export { ListProductsByUserController };
