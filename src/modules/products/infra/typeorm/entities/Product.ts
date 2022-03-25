import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("products")
class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    internal_code: string;

    @Column()
    name: string;

    @Column()
    is_kit: boolean;

    @Column()
    unit: string;

    @Column()
    brand: string;

    @Column()
    inventory: number;

    @Column("decimal", { precision: 10, scale: 2 })
    total_costs: number;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Product };
