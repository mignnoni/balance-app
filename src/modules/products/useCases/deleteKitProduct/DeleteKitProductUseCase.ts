import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class DeleteKitProductUseCase {
    constructor(
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(id: string): Promise<void> {
        const kitProduct = await this.kitProductsRepository.findById(id);

        if (!kitProduct) {
            throw new AppError("Kit Product not found");
        }

        const main_product = await this.productsRepository.findById(
            kitProduct.main_product_id
        );

        const kit_item = await this.productsRepository.findById(
            kitProduct.kit_item_id
        );

        const total_costs =
            Number(main_product.total_costs) -
            Number(kitProduct.kit_item_quantity) * Number(kit_item.total_costs);

        await this.productsRepository.updateTotalCost(
            main_product.id,
            total_costs
        );

        await this.kitProductsRepository.delete(id);
    }
}

export { DeleteKitProductUseCase };
