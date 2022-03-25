import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMarketplacesByUserUseCase } from "./ListMarketplacesByUserUseCase";

class ListMarketplacesByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const listMarketplacesByUserUseCase = container.resolve(
            ListMarketplacesByUserUseCase
        );

        const marketplaces = await listMarketplacesByUserUseCase.execute(
            user_id
        );

        return response.json(marketplaces);
    }
}

export { ListMarketplacesByUserController };
