import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class DeleteSaleUseCase {
    constructor(
        @inject("SalesRepository")
        private salesRepository: ISalesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(id: string, user_id: string) {
        const sale = await this.salesRepository.findById(id);

        if (!sale) {
            throw new AppError("Sale not found");
        }

        if (sale.user_id !== user_id) {
            throw new AppError("You can not delete a sale from another user");
        }

        const product = await this.productsRepository.findById(sale.product_id);

        const newInventory = Number(product.inventory) + Number(sale.quantity);

        await this.salesRepository.delete(id);
        await this.productsRepository.updateInventory(product.id, newInventory);
    }
}

export { DeleteSaleUseCase };
