import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateKitItems1647282661121 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "kit_products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "main_product_id",
                        type: "uuid",
                    },
                    {
                        name: "kit_item_id",
                        type: "uuid",
                    },
                    {
                        name: "kit_item_quantity",
                        type: "numeric",
                        default: 0,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKMainProductKit",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["main_product_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKProductKit",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["kit_item_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("kit_products");
    }
}
