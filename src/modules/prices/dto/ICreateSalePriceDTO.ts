interface ICreateSalePriceDTO {
    id?: string;

    product_id: string;

    marketplace_id: string;

    tax_fee: number;

    comission_fee: number;

    fixed_fee: number;

    expected_profit: number;

    practiced_sale_price: number;
}

export { ICreateSalePriceDTO };
