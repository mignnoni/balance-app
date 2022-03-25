import { getRepository, Repository } from "typeorm";

import { ICreateMarketPlaceDTO } from "../../../dto/ICreateMarketplaceDTO";
import { IMarketplacesRepository } from "../../../repositories/IMarketplacesRepository";
import { Marketplace } from "../entities/Marketplace";

class MarketplacesRepository implements IMarketplacesRepository {
    private repository: Repository<Marketplace>;

    constructor() {
        this.repository = getRepository(Marketplace);
    }

    async create({ id, user_id, name }: ICreateMarketPlaceDTO): Promise<void> {
        const marketplace = this.repository.create({ id, user_id, name });

        await this.repository.save(marketplace);
    }

    async findByUserId(user_id: string): Promise<Marketplace[]> {
        const marketplaces = await this.repository.find({ user_id });

        return marketplaces;
    }

    async findById(id: string): Promise<Marketplace> {
        const marketplace = await this.repository.findOne(id);

        return marketplace;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { MarketplacesRepository };
