import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IFindSaleByUserDTO } from "../../dto/IFindSaleByUserDTO";
import { Sale } from "../../infra/typeorm/entities/Sale";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IResponse {
    sales: Sale[];
    total_profit: number;
}

@injectable()
class ListSalesUseCase {
    constructor(
        @inject("SalesRepository")
        private salesRepository: ISalesRepository
    ) {}

    async execute({
        user_id,
        month,
        product_id,
        marketplace_id,
    }: IFindSaleByUserDTO): Promise<IResponse> {
        if (month) {
            if (month < 1 || month > 12) {
                throw new AppError("Invalid month");
            }
        }

        const sales = await this.salesRepository.findSalesByUser({
            user_id,
            month,
            product_id,
            marketplace_id,
        });

        let total_profit = 0;

        sales.forEach((sale) => {
            const { profit } = sale;

            total_profit += Number(profit);

            return total_profit;
        });

        return {
            sales,
            total_profit,
        };
    }
}

export { ListSalesUseCase };
