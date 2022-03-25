import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSaleUseCase } from "./CreateSaleUseCase";

class CreateSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { product_id, marketplace_id } = request.query;
        const { month } = request.params;
        const { quantity } = request.body;

        const createSaleUseCase = container.resolve(CreateSaleUseCase);

        await createSaleUseCase.execute({
            user_id: id,
            product_id: String(product_id),
            marketplace_id: String(marketplace_id),
            month: Number(month),
            quantity,
        });

        return response.status(201).send();
    }
}

export { CreateSaleController };
