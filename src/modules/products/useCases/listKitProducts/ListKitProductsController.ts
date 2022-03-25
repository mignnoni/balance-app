import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListKitProductsUseCase } from "./ListKitProductsUseCase";

class ListKitProductsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id: main_product_id } = request.params;
        const listKitProductsUseCase = container.resolve(
            ListKitProductsUseCase
        );

        const kitProducts = await listKitProductsUseCase.execute(
            main_product_id
        );

        return response.json(kitProducts);
    }
}

export { ListKitProductsController };
