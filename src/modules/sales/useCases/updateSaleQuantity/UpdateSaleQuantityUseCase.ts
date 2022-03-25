import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class UpdateSaleQuantityUseCase {
    constructor(
        @inject("SalesRepository")
        private salesRepository: ISalesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(
        id: string,
        quantity: number,
        user_id: string
    ): Promise<void> {
        const sale = await this.salesRepository.findById(id);

        if (!sale) {
            throw new AppError("Sale not found");
        }

        if (sale.user_id !== user_id) {
            throw new AppError("You can not update a sale from another user");
        }

        const product = await this.productsRepository.findById(sale.product_id);

        const oldQuantity = sale.quantity;
        const newInventory =
            Number(product.inventory) + Number(oldQuantity) - Number(quantity);

        const unitary_profit = sale.profit / sale.quantity;
        const newProfit = unitary_profit * Number(quantity);

        sale.quantity = Number(quantity);
        sale.profit = Number(newProfit);

        await this.salesRepository.create(sale);
        await this.productsRepository.updateInventory(product.id, newInventory);
    }
}

export { UpdateSaleQuantityUseCase };
