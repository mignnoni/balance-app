import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("sale_prices")
class SalePrice {
    @PrimaryColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    marketplace_id: string;

    @Column("decimal", { precision: 10, scale: 2 })
    tax_fee: number;

    @Column("decimal", { precision: 10, scale: 2 })
    comission_fee: number;

    @Column("decimal", { precision: 10, scale: 2 })
    fixed_fee: number;

    @Column("decimal", { precision: 10, scale: 2 })
    expected_profit: number;

    @Column("decimal", { precision: 10, scale: 2 })
    practiced_sale_price: number;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { SalePrice };
