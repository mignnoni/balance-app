import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { getRealProfitForOneSale } from "../../../../utils/getSalePrice";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
    user_id: string;
    product_id: string;
    marketplace_id: string;
    month: number;
    quantity: number;
    practiced_sale_price: number;
    total_costs: number;
    fixed_fee: number;
    tax_fee: number;
    comission_fee: number;
}

@injectable()
class CreateSaleWithDiferentPricesUseCase {
    constructor(
        @inject("SalesRepository")
        private salesRepository: ISalesRepository
    ) {}

    async execute({
        user_id,
        product_id,
        marketplace_id,
        month,
        quantity,
        practiced_sale_price,
        total_costs,
        fixed_fee,
        tax_fee,
        comission_fee,
    }: IRequest) {
        if (month < 1 || month > 12) {
            throw new AppError("Invalid month");
        }

        if (quantity <= 0) {
            throw new AppError("Quantity must be bigger then 0");
        }

        const sale =
            await this.salesRepository.findByProductAndMarketplaceAndMonth({
                product_id,
                marketplace_id,
                month,
            });

        if (!sale) {
            throw new AppError("You must have a previous sale to do this");
        }

        const productSalePrice = {
            id: "not-valid",
            product_id,
            marketplace_id,
            expected_profit: 0,
            created_at: new Date(),
            practiced_sale_price,
            fixed_fee,
            tax_fee,
            comission_fee,
        };

        const real_profit = getRealProfitForOneSale({
            productSalePrice,
            total_costs,
        });

        const profit = real_profit * quantity;

        console.log(profit);

        await this.salesRepository.create({
            user_id,
            product_id,
            marketplace_id,
            month: Number(month),
            quantity: Number(quantity),
            profit: Number(profit),
        });
    }
}

export { CreateSaleWithDiferentPricesUseCase };
