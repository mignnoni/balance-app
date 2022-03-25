import { getRepository, Repository } from "typeorm";

import { ICreateProductDTO } from "../../../dto/ICreateProductDTO";
import { IUpdateProductDTO } from "../../../dto/IUpdateProductDTO";
import { IProductsRepository } from "../../../repositories/IProductsRepository";
import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
    private repository: Repository<Product>;
    constructor() {
        this.repository = getRepository(Product);
    }

    async create({
        user_id,
        internal_code,
        name,
        is_kit,
        unit,
        brand,
        inventory,
        total_costs,
    }: ICreateProductDTO): Promise<Product> {
        const product = this.repository.create({
            user_id,
            internal_code,
            name,
            is_kit,
            unit,
            brand,
            inventory,
            total_costs: Number(total_costs),
        });

        await this.repository.save(product);

        return product;
    }

    async update({
        id,
        user_id,
        internal_code,
        name,
        unit,
        brand,
        inventory,
    }: IUpdateProductDTO): Promise<Product> {
        const productUpdated = this.repository.create({
            id,
            user_id,
            internal_code,
            name,
            unit,
            brand,
            inventory,
        });

        await this.repository.save(productUpdated);

        return productUpdated;
    }

    async findByInternalCodeAndUser(
        internal_code: string,
        user_id: string
    ): Promise<Product> {
        const product = await this.repository.findOne({
            internal_code,
            user_id,
        });

        return product;
    }

    async findByIds(ids: string[]): Promise<Product[]> {
        const products = await this.repository.findByIds(ids);

        return products;
    }

    async findByUserId(user_id: string): Promise<Product[]> {
        const products = await this.repository.find({ user_id });

        return products;
    }

    async findById(id: string): Promise<Product> {
        const product = await this.repository.findOne(id);

        return product;
    }

    async updateTotalCost(id: string, total_costs: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ total_costs })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async updateInventory(id: string, inventory: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ inventory })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { ProductsRepository };
