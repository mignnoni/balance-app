import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { getTotalSalePrice } from "../../../../utils/getSalePrice";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { SalePrice } from "../../infra/typeorm/entities/SalePrice";
import { ISalePricesRepository } from "../../repositories/ISalePricesRepository";

interface IResponse {
    productSalePrice: SalePrice;
    suggested_sale_price: number;
    real_profit: number;
}

@injectable()
class ListSalePricesByProductUseCase {
    constructor(
        @inject("SalePricesRepository")
        private salePricesRepository: ISalePricesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(product_id: string): Promise<IResponse[]> {
        const product = await this.productsRepository.findById(product_id);
        if (!product) {
            throw new AppError("Product not found");
        }

        const { total_costs } = product;

        const productSalePrices =
            await this.salePricesRepository.findByProductId(product_id);

        const salePrices = getTotalSalePrice({
            productSalePrices,
            total_costs,
        });

        return salePrices;
    }
}

export { ListSalePricesByProductUseCase };
