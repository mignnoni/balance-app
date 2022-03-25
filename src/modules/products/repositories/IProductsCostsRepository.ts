import { ICreateProductCostDTO } from "../dto/ICreateProductCostDTO";
import { ProductCosts } from "../infra/typeorm/entities/ProductCosts";

interface IProductsCostsRepository {
    create(data: ICreateProductCostDTO): Promise<void>;
    findByProductId(product_id: string): Promise<ProductCosts[]>;
    findById(id: string): Promise<ProductCosts>;
    update(id: string, name?: string, amount?: number): Promise<void>;
    delete(id: string): Promise<void>;
}

export { IProductsCostsRepository };
