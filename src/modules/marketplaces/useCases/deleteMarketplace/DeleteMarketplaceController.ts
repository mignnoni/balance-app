import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteMarketplaceUseCase } from "./DeleteMarketplaceUseCase";

class DeleteMarketplaceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const deleteMarketplaceUseCase = container.resolve(
            DeleteMarketplaceUseCase
        );

        await deleteMarketplaceUseCase.execute(id, user_id);

        return response.sendStatus(204).end();
    }
}

export { DeleteMarketplaceController };
