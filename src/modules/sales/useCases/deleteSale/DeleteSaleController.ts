import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSaleUseCase } from "./DeleteSaleUseCase";

class DeleteSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.user;

        const deleteSaleUseCase = container.resolve(DeleteSaleUseCase);

        deleteSaleUseCase.execute(id, user_id);

        return response.sendStatus(204).end();
    }
}

export { DeleteSaleController };
