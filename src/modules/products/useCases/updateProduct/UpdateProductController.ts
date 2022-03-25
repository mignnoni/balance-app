import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { product_id: id } = request.params;
        const { internal_code, name, unit, brand, inventory } = request.body;

        const updateProductUseCase = container.resolve(UpdateProductUseCase);

        const product = await updateProductUseCase.execute({
            id,
            user_id,
            internal_code,
            name,
            unit,
            brand,
            inventory,
        });

        return response.json(product);
    }
}

export { UpdateProductController };
