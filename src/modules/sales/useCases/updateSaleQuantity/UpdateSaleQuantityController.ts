import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSaleQuantityUseCase } from "./UpdateSaleQuantityUseCase";

class UpdateSaleQuantityController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.user;
        const { quantity } = request.body;

        const updateSaleQuantityUseCase = container.resolve(
            UpdateSaleQuantityUseCase
        );

        updateSaleQuantityUseCase.execute(id, quantity, user_id);

        return response.send();
    }
}

export { UpdateSaleQuantityController };
