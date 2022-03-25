import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateMarketplaceUseCase } from "./UpdateMarketplaceUseCase";

class UpdateMarketplaceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;
        const { name } = request.body;

        const updateMarketplaceUseCase = container.resolve(
            UpdateMarketplaceUseCase
        );

        await updateMarketplaceUseCase.execute(id, user_id, name);

        return response.send();
    }
}

export { UpdateMarketplaceController };
