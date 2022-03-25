import { ICreateMarketPlaceDTO } from "../dto/ICreateMarketplaceDTO";
import { Marketplace } from "../infra/typeorm/entities/Marketplace";

interface IMarketplacesRepository {
    create(data: ICreateMarketPlaceDTO): Promise<void>;
    findByUserId(user_id: string): Promise<Marketplace[]>;
    findById(id: string): Promise<Marketplace>;
    delete(id: string): Promise<void>;
}

export { IMarketplacesRepository };
