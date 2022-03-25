import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ProductCosts } from "../../infra/typeorm/entities/ProductCosts";
import { IProductsCostsRepository } from "../../repositories/IProductsCostsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class ListProductCostsUseCase {
    constructor(
        @inject("ProductsCostsRepository")
        private productsCostsRepository: IProductsCostsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(product_id: string): Promise<ProductCosts[]> {
        const productCosts = await this.productsCostsRepository.findByProductId(
            product_id
        );

        const product = await this.productsRepository.findById(product_id);

        if (!product) {
            throw new AppError("Product not found");
        }

        return productCosts;
    }
}

export { ListProductCostsUseCase };
