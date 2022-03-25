import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSalePriceUseCase } from "./UpdateSalePriceUseCase";

class UpdateSalePriceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.user;
        const {
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        } = request.body;

        const updateSalePriceUseCase = container.resolve(
            UpdateSalePriceUseCase
        );

        await updateSalePriceUseCase.execute({
            id,
            user_id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });

        return response.send();
    }
}

export { UpdateSalePriceController };
