import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("products_costs")
class ProductCosts {
    @PrimaryColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { ProductCosts };
