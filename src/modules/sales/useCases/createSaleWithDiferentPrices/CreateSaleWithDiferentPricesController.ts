import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSaleWithDiferentPricesUseCase } from "./CreateSaleWithDiferentPricesUseCase";

class CreateSaleWithDiferentPricesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { month } = request.params;
        const {
            quantity,
            practiced_sale_price,
            total_costs,
            fixed_fee,
            tax_fee,
            comission_fee,
        } = request.body;

        const { product_id, marketplace_id } = request.query;

        const createSaleWithDiferentPricesUseCase = container.resolve(
            CreateSaleWithDiferentPricesUseCase
        );

        await createSaleWithDiferentPricesUseCase.execute({
            user_id,
            product_id: String(product_id),
            marketplace_id: String(marketplace_id),
            month: Number(month),
            quantity,
            practiced_sale_price,
            total_costs,
            fixed_fee,
            tax_fee,
            comission_fee,
        });

        return response.status(201).send();
    }
}

export { CreateSaleWithDiferentPricesController };
