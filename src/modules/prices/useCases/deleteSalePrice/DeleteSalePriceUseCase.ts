import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IMarketplacesRepository } from "../../../marketplaces/repositories/IMarketplacesRepository";
import { ISalePricesRepository } from "../../repositories/ISalePricesRepository";

@injectable()
class DeleteSalePriceUseCase {
    constructor(
        @inject("SalePricesRepository")
        private salePricesRepository: ISalePricesRepository,
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute(id: string, user_id: string): Promise<void> {
        const salePrice = await this.salePricesRepository.findById(id);

        if (!salePrice) {
            throw new AppError("Sale price not found");
        }

        const marketplace = await this.marketplacesRepository.findById(
            salePrice.marketplace_id
        );

        if (marketplace.user_id !== user_id) {
            throw new AppError(
                "You can not delete a sale price from another user"
            );
        }

        await this.salePricesRepository.delete(id);
    }
}

export { DeleteSalePriceUseCase };
