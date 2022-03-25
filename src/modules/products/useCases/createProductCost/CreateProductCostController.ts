import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductCostUseCase } from "./CreateProductCostUseCase";

class CreateProductCostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;
        const { name, amount } = request.body;

        const createProductCostUseCase = container.resolve(
            CreateProductCostUseCase
        );

        const productCost = await createProductCostUseCase.execute({
            product_id,
            name,
            amount,
        });

        return response.status(201).json(productCost);
    }
}

export { CreateProductCostController };
