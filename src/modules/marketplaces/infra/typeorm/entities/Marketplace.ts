import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("marketplaces")
class Marketplace {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Marketplace };
