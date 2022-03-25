import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateProductDTO } from "../../dto/IUpdateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class UpdateProductUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute({
        id,
        user_id,
        internal_code,
        name,
        unit,
        brand,
        inventory,
    }: IUpdateProductDTO): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError("Product not found");
        }

        const internalCodeExists =
            await this.productsRepository.findByInternalCodeAndUser(
                internal_code,
                user_id
            );

        if (internalCodeExists) {
            throw new AppError("Internal code already exists");
        }

        if (internal_code) {
            product.internal_code = internal_code;
        }

        if (name) {
            product.name = name;
        }

        if (unit) {
            product.unit = unit;
        }

        if (brand) {
            product.brand = brand;
        }

        if (inventory) {
            product.inventory = inventory;
        }

        await this.productsRepository.update(product);

        return product;
    }
}

export { UpdateProductUseCase };
