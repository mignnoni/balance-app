import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Product } from "./Product";

@Entity("kit_products")
class KitProduct {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "kit_item_id" })
    kit_item: Product;

    @Column()
    main_product_id: string;

    @Column()
    kit_item_id: string;

    @Column()
    kit_item_quantity: number;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { KitProduct };
