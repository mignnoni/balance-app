import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";
import { IProductsCostsRepository } from "../../repositories/IProductsCostsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
    id: string;
    user_id: string;
    name?: string;
    amount?: number;
}

@injectable()
class UpdateProductCostUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("ProductsCostsRepository")
        private productsCostsRepository: IProductsCostsRepository,
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository
    ) {}

    async execute({ id, user_id, name, amount }: IRequest): Promise<void> {
        if (amount <= 0) {
            throw new AppError("Amount should be bigger than 0");
        }

        const productCost = await this.productsCostsRepository.findById(id);

        if (!productCost) {
            throw new AppError("Product cost not found");
        }

        const product = await this.productsRepository.findById(
            productCost.product_id
        );

        if (product.user_id !== user_id) {
            throw new AppError(
                "You can not update a product cost from another user"
            );
        }

        const oldAmount = productCost.amount;
        const total_costs =
            Number(product.total_costs) - Number(oldAmount) + Number(amount);

        const kitProduct = await this.kitProductsRepository.findByKitItem(
            product.id
        );

        /* Se retornar algo no kitProduct, quer dizer que o produto para o qual se está alterando um custo, faz parte de um ou mais kits de produtos,
        então é necessário alterar o custo total do main_product, que é o "Produto pai" do kit.
         */

        if (kitProduct) {
            kitProduct.forEach(async (kitProduct) => {
                const { main_product_id, kit_item_quantity } = kitProduct;
                const main_product = await this.productsRepository.findById(
                    main_product_id
                );

                const total =
                    Number(main_product.total_costs) +
                    Number(kit_item_quantity) * Number(amount) -
                    Number(kit_item_quantity) * Number(oldAmount);

                await this.productsRepository.updateTotalCost(
                    main_product_id,
                    total
                );
            });
        }

        await this.productsCostsRepository.update(id, name, amount);

        await this.productsRepository.updateTotalCost(product.id, total_costs);
    }
}

export { UpdateProductCostUseCase };
