import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductCostsUseCase } from "./ListProductCostsUseCase";

class ListProductCostsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;

        const listProductCostsUseCase = container.resolve(
            ListProductCostsUseCase
        );

        const productsCosts = await listProductCostsUseCase.execute(product_id);

        return response.json(productsCosts);
    }
}

export { ListProductCostsController };
