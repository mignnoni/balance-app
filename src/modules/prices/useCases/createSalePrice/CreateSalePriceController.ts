import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSalePriceUseCase } from "./CreateSalePriceUseCase";

class CreateSalePriceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;
        const {
            marketplace_id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        } = request.body;

        const createSalePriceUseCase = container.resolve(
            CreateSalePriceUseCase
        );

        const salePrice = await createSalePriceUseCase.execute({
            product_id,
            marketplace_id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });

        return response.status(201).json(salePrice);
    }
}

export { CreateSalePriceController };
