import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateKitProductUseCase } from "./CreateKitProductUseCase";

class CreateKitProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;
        const { kit_item_id, kit_item_quantity } = request.body;

        const createKitProductUseCase = container.resolve(
            CreateKitProductUseCase
        );

        const kitProduct = await createKitProductUseCase.execute({
            main_product_id: product_id,
            kit_item_id,
            kit_item_quantity,
        });

        return response.json(kitProduct);
    }
}

export { CreateKitProductController };
