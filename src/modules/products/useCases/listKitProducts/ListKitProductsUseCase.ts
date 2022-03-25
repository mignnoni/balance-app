import { inject, injectable } from "tsyringe";

import { KitProduct } from "../../infra/typeorm/entities/KitProduct";
import { IKitProductsRepository } from "../../repositories/IKitProductsRepository";

@injectable()
class ListKitProductsUseCase {
    constructor(
        @inject("KitProductsRepository")
        private kitProductsRepository: IKitProductsRepository
    ) {}

    async execute(main_product_id: string): Promise<KitProduct[]> {
        const products = await this.kitProductsRepository.findByMainProduct(
            main_product_id
        );

        return products;
    }
}

export { ListKitProductsUseCase };
