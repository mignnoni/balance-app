import { getRepository, Repository } from "typeorm";

import {
    ICreateKitProductsDTO,
    IKitProductsRepository,
} from "../../../repositories/IKitProductsRepository";
import { KitProduct } from "../entities/KitProduct";

class KitProductsRepository implements IKitProductsRepository {
    private repository: Repository<KitProduct>;
    constructor() {
        this.repository = getRepository(KitProduct);
    }

    async create({
        main_product_id,
        kit_item_id,
        kit_item_quantity,
    }: ICreateKitProductsDTO): Promise<KitProduct> {
        const kit = this.repository.create({
            main_product_id,
            kit_item_id,
            kit_item_quantity,
        });

        await this.repository.save(kit);

        return kit;
    }

    async findByMainProduct(main_product_id: string): Promise<KitProduct[]> {
        const products = await this.repository.find({
            where: { main_product_id },
            relations: ["kit_item"],
        });

        return products;
    }

    async findByKitItem(kit_item_id: string): Promise<KitProduct[]> {
        const kitProducts = await this.repository.find({ kit_item_id });

        return kitProducts;
    }

    async findById(id: string): Promise<KitProduct> {
        const kitProduct = await this.repository.findOne(id);

        return kitProduct;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { KitProductsRepository };
