import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSalesUseCase } from "./ListSalesUseCase";

class ListSalesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { month, product_id, marketplace_id } = request.query;

        const listSalesUseCase = container.resolve(ListSalesUseCase);

        const sales = await listSalesUseCase.execute({
            user_id,
            month: Number(month),
            product_id: String(product_id),
            marketplace_id: String(marketplace_id),
        });

        return response.json(sales);
    }
}

export { ListSalesController };
