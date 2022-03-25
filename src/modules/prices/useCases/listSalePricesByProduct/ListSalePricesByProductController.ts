import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSalePricesByProductUseCase } from "./ListSalePricesByProductUseCase";

class ListSalePricesByProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id: id } = request.params;

        const listSalePricesByProductUseCase = container.resolve(
            ListSalePricesByProductUseCase
        );

        const productSalePrices = await listSalePricesByProductUseCase.execute(
            id
        );

        return response.json(productSalePrices);
    }
}

export { ListSalePricesByProductController };
