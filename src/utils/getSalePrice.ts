import { SalePrice } from "../modules/prices/infra/typeorm/entities/SalePrice";

interface IRequest {
    productSalePrices: SalePrice[];
    total_costs: number;
}

interface IRequestForOneSale {
    productSalePrice: SalePrice;
    total_costs: number;
}

interface IResponse {
    productSalePrice: SalePrice;
    suggested_sale_price: number;
    real_profit: number;
}

function getRealProfitForOneSale({
    productSalePrice,
    total_costs,
}: IRequestForOneSale): number {
    const { practiced_sale_price, fixed_fee, tax_fee, comission_fee } =
        productSalePrice;

    const calc_real_profit =
        Number(practiced_sale_price) -
        Number(total_costs) -
        Number(fixed_fee) -
        Number(practiced_sale_price) * (Number(tax_fee) / 100) -
        Number(practiced_sale_price) * (Number(comission_fee) / 100);

    const real_profit = parseFloat(calc_real_profit.toFixed(2));

    return real_profit;
}

async function getSalePriceForOneSale({
    productSalePrice,
    total_costs,
}: IRequestForOneSale): Promise<IResponse> {
    const {
        practiced_sale_price,
        expected_profit,
        fixed_fee,
        tax_fee,
        comission_fee,
    } = productSalePrice;

    const expected_profit_in_reais = total_costs * (expected_profit / 100);

    const calc_suggested_sale_price =
        (Number(total_costs) +
            Number(expected_profit_in_reais) +
            Number(fixed_fee)) /
        (1 - tax_fee / 100 - comission_fee / 100);

    const suggested_sale_price = parseFloat(
        calc_suggested_sale_price.toFixed(2)
    );

    const calc_real_profit =
        Number(practiced_sale_price) -
        Number(total_costs) -
        Number(fixed_fee) -
        Number(practiced_sale_price) * (Number(tax_fee) / 100) -
        Number(practiced_sale_price) * (Number(comission_fee) / 100);

    const real_profit = parseFloat(calc_real_profit.toFixed(2));

    return { productSalePrice, suggested_sale_price, real_profit };
}

function getTotalSalePrice({
    productSalePrices,
    total_costs,
}: IRequest): IResponse[] {
    const salePrices = [];

    productSalePrices.forEach((productSalePrice) => {
        const {
            practiced_sale_price,
            expected_profit,
            fixed_fee,
            tax_fee,
            comission_fee,
        } = productSalePrice;

        const expected_profit_in_reais = total_costs * (expected_profit / 100);

        const calc_suggested_sale_price =
            (Number(total_costs) +
                Number(expected_profit_in_reais) +
                Number(fixed_fee)) /
            (1 - tax_fee / 100 - comission_fee / 100);

        const suggested_sale_price = parseFloat(
            calc_suggested_sale_price.toFixed(2)
        );

        const calc_real_profit =
            Number(practiced_sale_price) -
            Number(total_costs) -
            Number(fixed_fee) -
            Number(practiced_sale_price) * (Number(tax_fee) / 100) -
            Number(practiced_sale_price) * (Number(comission_fee) / 100);

        const real_profit = parseFloat(calc_real_profit.toFixed(2));

        salePrices.push({
            productSalePrice,
            suggested_sale_price,
            real_profit,
        });
    });

    return salePrices;
}

export { getTotalSalePrice, getRealProfitForOneSale, getSalePriceForOneSale };
