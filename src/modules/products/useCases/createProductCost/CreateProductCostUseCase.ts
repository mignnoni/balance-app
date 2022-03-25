import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProductCostDTO } from "../../dto/ICreateProductCostDTO";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";
import { IProductsCostsRepository } from "../../repositories/IProductsCostsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class CreateProductCostUseCase {
    constructor(
        @inject("ProductsCostsRepository")
        private productsCostsRepository: IProductsCostsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository
    ) {}

    async execute({
        product_id,
        name,
        amount,
    }: ICreateProductCostDTO): Promise<void> {
        if (amount <= 0) {
            throw new AppError("Amount should be bigger than 0");
        }

        const product = await this.productsRepository.findById(product_id);

        if (!product) {
            throw new AppError("Product not found");
        }

        await this.productsCostsRepository.create({
            product_id,
            name,
            amount,
        });

        const total_costs = Number(product.total_costs) + Number(amount);

        const kitProduct = await this.kitProductsRepository.findByKitItem(
            product_id
        );

        /* Se retornar algo no kitProduct, quer dizer que o produto para o qual se está criando um custo, faz parte de um ou mais kits de produtos,
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
                    Number(kit_item_quantity) * Number(amount);

                await this.productsRepository.updateTotalCost(
                    main_product_id,
                    total
                );
            });
        }

        await this.productsRepository.updateTotalCost(product_id, total_costs);
    }
}

export { CreateProductCostUseCase };
