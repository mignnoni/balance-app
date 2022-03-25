import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProductDTO } from "../../dto/ICreateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";
import { ProductsRepository } from "../../infra/typeorm/repositories/ProductsRepository";

@injectable()
class CreateProductUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: ProductsRepository
    ) {}

    async execute({
        user_id,
        internal_code,
        name,
        is_kit,
        unit,
        brand,
        inventory,
    }: ICreateProductDTO): Promise<Product> {
        const internalCodeAlreadyExists =
            await this.productsRepository.findByInternalCodeAndUser(
                internal_code,
                user_id
            );

        if (internalCodeAlreadyExists) {
            throw new AppError("Internal code already exists");
        }

        const product = await this.productsRepository.create({
            user_id,
            internal_code,
            name,
            is_kit,
            unit,
            brand,
            inventory,
            total_costs: 0,
        });

        return product;
    }
}

export { CreateProductUseCase };
