import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IMarketplacesRepository } from "../../repositories/IMarketplacesRepository";

@injectable()
class UpdateMarketplaceUseCase {
    constructor(
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute(id: string, user_id: string, name: string): Promise<void> {
        const marketplace = await this.marketplacesRepository.findById(id);

        if (!marketplace) {
            throw new AppError("Marketplace not found");
        }

        if (marketplace.user_id !== user_id) {
            throw new AppError(
                "You can not update a marketplace from another user"
            );
        }

        await this.marketplacesRepository.create({ id, user_id, name });
    }
}

export { UpdateMarketplaceUseCase };
