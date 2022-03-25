import { inject, injectable } from "tsyringe";

import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class ListProductsByUserUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(user_id: string): Promise<Product[]> {
        const products = await this.productsRepository.findByUserId(user_id);

        return products;
    }
}

export { ListProductsByUserUseCase };
