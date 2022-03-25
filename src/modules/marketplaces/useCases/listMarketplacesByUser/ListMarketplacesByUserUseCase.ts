import { inject, injectable } from "tsyringe";

import { Marketplace } from "../../infra/typeorm/entities/Marketplace";
import { IMarketplacesRepository } from "../../repositories/IMarketplacesRepository";

@injectable()
class ListMarketplacesByUserUseCase {
    constructor(
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute(user_id: string): Promise<Marketplace[]> {
        const marketplaces = await this.marketplacesRepository.findByUserId(
            user_id
        );

        return marketplaces;
    }
}

export { ListMarketplacesByUserUseCase };
