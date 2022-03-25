interface ICreateSaleDTO {
    id?: string;
    user_id: string;
    product_id: string;
    marketplace_id: string;
    month: number;
    quantity: number;
    profit?: number;
}

export { ICreateSaleDTO };
