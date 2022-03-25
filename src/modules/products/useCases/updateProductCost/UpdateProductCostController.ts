import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductCostUseCase } from "./UpdateProductCostUseCase";

class UpdateProductCostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;
        const { name, amount } = request.body;

        const updateProductCostUseCase = container.resolve(
            UpdateProductCostUseCase
        );

        await updateProductCostUseCase.execute({
            id: String(id),
            user_id,
            name,
            amount: Number(amount),
        });

        return response.send();
    }
}

export { UpdateProductCostController };
