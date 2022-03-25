import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;

        const deleteProductUseCase = container.resolve(DeleteProductUseCase);

        await deleteProductUseCase.execute(product_id);

        return response.sendStatus(204).end();
    }
}

export { DeleteProductController };
