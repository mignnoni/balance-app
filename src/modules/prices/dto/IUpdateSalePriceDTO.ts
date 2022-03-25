interface IUpdateSalePriceDTO {
    id: string;

    user_id?: string;

    tax_fee?: number;

    comission_fee?: number;

    fixed_fee?: number;

    expected_profit?: number;

    practiced_sale_price?: number;
}

export { IUpdateSalePriceDTO };
