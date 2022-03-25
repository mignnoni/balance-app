import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IMarketplacesRepository } from "../../../marketplaces/repositories/IMarketplacesRepository";
import { IUpdateSalePriceDTO } from "../../dto/IUpdateSalePriceDTO";
import { ISalePricesRepository } from "../../repositories/ISalePricesRepository";

@injectable()
class UpdateSalePriceUseCase {
    constructor(
        @inject("SalePricesRepository")
        private salePricesRepository: ISalePricesRepository,
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository
    ) {}

    async execute({
        id,
        user_id,
        tax_fee,
        comission_fee,
        fixed_fee,
        expected_profit,
        practiced_sale_price,
    }: IUpdateSalePriceDTO): Promise<void> {
        if (
            tax_fee < 0 ||
            comission_fee < 0 ||
            expected_profit < 0 ||
            practiced_sale_price < 0 ||
            fixed_fee < 0
        ) {
            throw new AppError("Value must be bigger or equal to 0");
        }

        const salePrice = await this.salePricesRepository.findById(id);

        if (!salePrice) {
            throw new AppError("Sale price not found");
        }

        const marketplace = await this.marketplacesRepository.findById(
            salePrice.marketplace_id
        );

        if (marketplace.user_id !== user_id) {
            throw new AppError(
                "You can not update a sale price from another user"
            );
        }

        await this.salePricesRepository.update({
            id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });
    }
}

export { UpdateSalePriceUseCase };
