import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";
import { IProductsCostsRepository } from "../../repositories/IProductsCostsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
    id: string;
    product_id: string;
    user_id: string;
}

@injectable()
class DeleteProductCostUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("ProductsCostsRepository")
        private productsCostsRepository: IProductsCostsRepository,
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository
    ) {}

    async execute({ id, product_id, user_id }: IRequest): Promise<void> {
        const productCost = await this.productsCostsRepository.findById(id);

        if (!productCost) {
            throw new AppError("Product cost not found");
        }
        const product = await this.productsRepository.findById(product_id);

        if (!product) {
            throw new AppError("Product not found");
        }

        if (product.user_id !== user_id) {
            throw new AppError(
                "You can not delete a product cost from another user"
            );
        }

        const oldAmount = productCost.amount;
        const total_costs = Number(product.total_costs) - Number(oldAmount);

        const kitProduct = await this.kitProductsRepository.findByKitItem(
            product_id
        );

        /* Se retornar algo no kitProduct, quer dizer que o produto para o qual se está deletando um custo, faz parte de um ou mais kits de produtos,
        então é necessário alterar o custo total do main_product, que é o "Produto pai" do kit.
         */

        if (kitProduct) {
            kitProduct.forEach(async (kitProduct) => {
                const { main_product_id, kit_item_quantity } = kitProduct;
                const main_product = await this.productsRepository.findById(
                    main_product_id
                );

                const total =
                    Number(main_product.total_costs) -
                    Number(kit_item_quantity) * Number(oldAmount);

                await this.productsRepository.updateTotalCost(
                    main_product_id,
                    total
                );
            });
        }

        await this.productsCostsRepository.delete(id);

        await this.productsRepository.updateTotalCost(product_id, total_costs);
    }
}

export { DeleteProductCostUseCase };
