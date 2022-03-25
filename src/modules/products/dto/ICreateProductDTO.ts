interface ICreateProductDTO {
    id?: string;
    user_id: string;
    internal_code: string;
    name: string;
    is_kit: boolean;
    unit: string;
    brand: string;
    inventory?: number;
    total_costs?: number;
}

export { ICreateProductDTO };
