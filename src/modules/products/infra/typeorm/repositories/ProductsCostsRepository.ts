import { getRepository, Repository } from "typeorm";

import { ICreateProductCostDTO } from "../../../dto/ICreateProductCostDTO";
import { IProductsCostsRepository } from "../../../repositories/IProductsCostsRepository";
import { ProductCosts } from "../entities/ProductCosts";

class ProductsCostsRepository implements IProductsCostsRepository {
    private repository: Repository<ProductCosts>;
    constructor() {
        this.repository = getRepository(ProductCosts);
    }

    async create({
        product_id,
        name,
        amount,
    }: ICreateProductCostDTO): Promise<void> {
        const productCost = this.repository.create({
            product_id,
            name,
            amount,
        });

        await this.repository.save(productCost);
    }

    async findByProductId(product_id: string): Promise<ProductCosts[]> {
        const productsCosts = await this.repository.find({ product_id });

        return productsCosts;
    }

    async findById(id: string): Promise<ProductCosts> {
        const productCost = await this.repository.findOne(id);

        return productCost;
    }

    async update(id: string, name?: string, amount?: number): Promise<void> {
        const newProductCost = this.repository.create({ id, name, amount });

        await this.repository.save(newProductCost);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { ProductsCostsRepository };
