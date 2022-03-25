import { KitProduct } from "../infra/typeorm/entities/KitProduct";

interface ICreateKitProductsDTO {
    main_product_id: string;
    kit_item_id: string;
    kit_item_quantity: number;
}

interface IKitProductsRepository {
    create({
        main_product_id,
        kit_item_id,
        kit_item_quantity,
    }: ICreateKitProductsDTO): Promise<KitProduct>;

    findById(id: string): Promise<KitProduct>;

    findByMainProduct(main_product_id: string): Promise<KitProduct[]>;

    findByKitItem(kit_item_id: string): Promise<KitProduct[]>;

    delete(id: string): Promise<void>;
}

export { ICreateKitProductsDTO, IKitProductsRepository };
