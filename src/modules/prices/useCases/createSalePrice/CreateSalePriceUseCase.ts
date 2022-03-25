import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { getSalePriceForOneSale } from "../../../../utils/getSalePrice";
import { IMarketplacesRepository } from "../../../marketplaces/repositories/IMarketplacesRepository";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { ICreateSalePriceDTO } from "../../dto/ICreateSalePriceDTO";
import { SalePrice } from "../../infra/typeorm/entities/SalePrice";
import { ISalePricesRepository } from "../../repositories/ISalePricesRepository";

interface IResponse {
    productSalePrice: SalePrice;
    suggested_sale_price: number;
    real_profit: number;
}

@injectable()
class CreateSalePriceUseCase {
    constructor(
        @inject("SalePricesRepository")
        private salePricesRepository: ISalePricesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute({
        product_id,
        marketplace_id,
        tax_fee,
        comission_fee,
        fixed_fee,
        expected_profit,
        practiced_sale_price,
    }: ICreateSalePriceDTO): Promise<IResponse> {
        if (
            tax_fee < 0 ||
            comission_fee < 0 ||
            expected_profit < 0 ||
            practiced_sale_price < 0 ||
            fixed_fee < 0
        ) {
            throw new AppError("Value must be bigger or equal to 0");
        }

        const product = await this.productsRepository.findById(product_id);

        if (!product) {
            throw new AppError("Product not found");
        }

        const marketplace = await this.marketplacesRepository.findById(
            marketplace_id
        );

        if (!marketplace) {
            throw new AppError("Marketplace not found");
        }

        const salepriceExists =
            await this.salePricesRepository.findByProductAndMarketplace(
                product_id,
                marketplace_id
            );

        if (salepriceExists) {
            throw new AppError(
                "Sale price for this product and marketplace already exists"
            );
        }

        const productSalePrice = await this.salePricesRepository.create({
            product_id,
            marketplace_id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });

        const { total_costs } = product;

        const funcao = getSalePriceForOneSale({
            productSalePrice,
            total_costs,
        });

        return funcao;
    }
}

export { CreateSalePriceUseCase };
