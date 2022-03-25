import { ICreateProductDTO } from "../dto/ICreateProductDTO";
import { IUpdateProductDTO } from "../dto/IUpdateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    update(data: IUpdateProductDTO): Promise<Product>;
    findByInternalCodeAndUser(
        internal_code: string,
        user_id: string
    ): Promise<Product>;
    findById(id: string): Promise<Product>;
    findByIds(ids: string[]): Promise<Product[]>;
    findByUserId(user_id: string): Promise<Product[]>;
    updateTotalCost(id: string, total_costs: number): Promise<void>;
    delete(id: string): Promise<void>;
    updateInventory(id: string, inventory: number): Promise<void>;
}

export { IProductsRepository };
