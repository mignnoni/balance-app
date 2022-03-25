import { ICreateSaleDTO } from "../dto/ICreateSaleDTO";
import { IFindSaleByUserDTO } from "../dto/IFindSaleByUserDTO";
import { IFindSaleDTO } from "../dto/IFindSaleDTO";
import { Sale } from "../infra/typeorm/entities/Sale";

interface ISalesRepository {
    create(data: ICreateSaleDTO): Promise<void>;
    findByProductAndMarketplaceAndMonth(data: IFindSaleDTO): Promise<Sale>;
    findSalesByUser(data: IFindSaleByUserDTO): Promise<Sale[]>;
    findById(id: string): Promise<Sale>;
    delete(id: string): Promise<void>;
}

export { ISalesRepository };
