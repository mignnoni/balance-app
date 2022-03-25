import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IMarketplacesRepository } from "../../repositories/IMarketplacesRepository";

@injectable()
class DeleteMarketplaceUseCase {
    constructor(
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute(id: string, user_id: string): Promise<void> {
        const marketplace = await this.marketplacesRepository.findById(id);

        if (!marketplace) {
            throw new AppError("Marketplace not found");
        }

        if (marketplace.user_id !== user_id) {
            throw new AppError(
                "You can not delete a marketplace from another user"
            );
        }

        await this.marketplacesRepository.delete(id);
    }
}

export { DeleteMarketplaceUseCase };
