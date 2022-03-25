import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { internal_code, name, is_kit, unit, brand, inventory } =
            request.body;

        const createProductUseCase = container.resolve(CreateProductUseCase);

        const product = await createProductUseCase.execute({
            user_id: id,
            internal_code,
            name,
            is_kit,
            unit,
            brand,
            inventory,
        });

        return response.json(product);
    }
}

export { CreateProductController };
