import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductCostUseCase } from "./DeleteProductCostUseCase";

class DeleteProductCostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id, product_id } = request.params;

        const deleteProductCostUseCase = container.resolve(
            DeleteProductCostUseCase
        );

        await deleteProductCostUseCase.execute({
            id,
            product_id,
            user_id,
        });

        return response.sendStatus(204).end();
    }
}

export { DeleteProductCostController };
