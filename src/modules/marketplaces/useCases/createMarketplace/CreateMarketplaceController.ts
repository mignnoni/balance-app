import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMarketplaceUseCase } from "./CreateMarketplaceUseCase";

class CreateMarketplaceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { name } = request.body;

        const createMarketplaceUseCase = container.resolve(
            CreateMarketplaceUseCase
        );

        await createMarketplaceUseCase.execute({ name, user_id });

        return response.status(201).send();
    }
}

export { CreateMarketplaceController };
