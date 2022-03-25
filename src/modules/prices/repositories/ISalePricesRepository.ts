import { ICreateSalePriceDTO } from "../dto/ICreateSalePriceDTO";
import { IUpdateSalePriceDTO } from "../dto/IUpdateSalePriceDTO";
import { SalePrice } from "../infra/typeorm/entities/SalePrice";

interface ISalePricesRepository {
    create(data: ICreateSalePriceDTO): Promise<SalePrice>;
    findByProductId(product_id: string): Promise<SalePrice[]>;
    findByProductAndMarketplace(
        product_id: string,
        marketplace_id: string
    ): Promise<SalePrice>;
    findById(id: string): Promise<SalePrice>;
    update(data: IUpdateSalePriceDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { ISalePricesRepository };
