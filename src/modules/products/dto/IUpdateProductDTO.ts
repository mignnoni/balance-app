interface IUpdateProductDTO {
    id: string;
    user_id: string;
    internal_code?: string;
    name?: string;
    unit?: string;
    brand?: string;
    inventory?: number;
}

export { IUpdateProductDTO };
