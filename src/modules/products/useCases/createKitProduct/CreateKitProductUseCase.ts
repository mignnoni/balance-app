import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { KitProduct } from "../../infra/typeorm/entities/KitProduct";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
    main_product_id: string;
    kit_item_id: string;
    kit_item_quantity: number;
}

@injectable()
class CreateKitProductUseCase {
    constructor(
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute({
        main_product_id,
        kit_item_id,
        kit_item_quantity,
    }: IRequest): Promise<KitProduct> {
        const products = [main_product_id, kit_item_id];

        if (kit_item_quantity <= 0) {
            throw new AppError("Quantity must be bigger than 0");
        }

        const productsExists = await this.productsRepository.findByIds(
            products
        );

        if (productsExists.length < products.length) {
            throw new AppError("Products not found");
        }

        if (main_product_id === kit_item_id) {
            throw new AppError(
                "You can not add the item you are trying to create a kit for"
            );
        }

        const main_product = await this.productsRepository.findById(
            main_product_id
        );

        const kit_item = await this.productsRepository.findById(kit_item_id);

        const total_costs =
            Number(main_product.total_costs) +
            Number(kit_item_quantity) * Number(kit_item.total_costs);

        const id = main_product_id;

        await this.productsRepository.updateTotalCost(id, total_costs);

        const kitProduct = await this.kitProductsRepository.create({
            main_product_id,
            kit_item_id,
            kit_item_quantity,
        });

        return kitProduct;
    }
}

export { CreateKitProductUseCase };
