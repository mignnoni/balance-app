import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSalePriceUseCase } from "./DeleteSalePriceUseCase";

class DeleteSalePriceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.user;

        const deleteSalePriceUseCase = container.resolve(
            DeleteSalePriceUseCase
        );

        deleteSalePriceUseCase.execute(id, user_id);

        return response.sendStatus(204).end();
    }
}

export { DeleteSalePriceController };
