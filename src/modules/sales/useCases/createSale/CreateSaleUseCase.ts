import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { getRealProfitForOneSale } from "../../../../utils/getSalePrice";
import { ISalePricesRepository } from "../../../prices/repositories/ISalePricesRepository";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
    user_id: string;
    product_id: string;
    marketplace_id: string;
    month: number;
    quantity: number;
}

@injectable()
class CreateSaleUseCase {
    constructor(
        @inject("SalesRepository")
        private salesRepository: ISalesRepository,
        @inject("SalePricesRepository")
        private salePricesRepository: ISalePricesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute({
        user_id,
        product_id,
        marketplace_id,
        month,
        quantity,
    }: IRequest) {
        if (month < 1 || month > 12) {
            throw new AppError("Invalid month");
        }

        if (quantity <= 0) {
            throw new AppError("Quantity must be bigger then 0");
        }

        const productSalePrice =
            await this.salePricesRepository.findByProductAndMarketplace(
                product_id,
                marketplace_id
            );

        if (!productSalePrice) {
            throw new AppError("Sale price not found");
        }

        const saleAlreadyExists =
            await this.salesRepository.findByProductAndMarketplaceAndMonth({
                product_id,
                marketplace_id,
                month,
            });

        if (saleAlreadyExists) {
            throw new AppError(
                "This sale for this marketplace already exists for this month"
            );
        }

        const product = await this.productsRepository.findById(
            productSalePrice.product_id
        );

        const { total_costs, inventory: oldInventory } = product;

        const real_profit = getRealProfitForOneSale({
            productSalePrice,
            total_costs,
        });

        const profit = real_profit * quantity;
        const inventory = oldInventory - quantity;

        await this.salesRepository.create({
            user_id,
            product_id,
            marketplace_id,
            month,
            quantity,
            profit,
        });

        await this.productsRepository.updateInventory(product_id, inventory);
    }
}

export { CreateSaleUseCase };
