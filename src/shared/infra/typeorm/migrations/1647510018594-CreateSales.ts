import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSales1647510018594 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sales",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                    },
                    {
                        name: "marketplace_id",
                        type: "uuid",
                    },

                    {
                        name: "month",
                        type: "smallint",
                    },
                    {
                        name: "quantity",
                        type: "int",
                    },
                    {
                        name: "profit",
                        type: "numeric",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSales",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKProductSales",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["product_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKMarketplaceSales",
                        referencedTableName: "marketplaces",
                        referencedColumnNames: ["id"],
                        columnNames: ["marketplace_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales");
    }
}
