import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteKitProductUseCase } from "./DeleteKitProductUseCase";

class DeleteKitProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteKitProductUseCase = container.resolve(
            DeleteKitProductUseCase
        );

        await deleteKitProductUseCase.execute(id);

        return response.sendStatus(204).end();
    }
}

export { DeleteKitProductController };
