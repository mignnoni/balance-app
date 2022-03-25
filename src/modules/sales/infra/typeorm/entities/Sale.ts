import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Marketplace } from "../../../../marketplaces/infra/typeorm/entities/Marketplace";

@Entity("sales")
class Sale {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    product_id: string;

    @ManyToOne(() => Marketplace)
    @JoinColumn({ name: "marketplace_id" })
    marketplace: Marketplace;

    @Column()
    marketplace_id: string;

    @Column()
    month: number;

    @Column()
    quantity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    profit: number;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Sale };
