import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSalePrice1647452973419 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sale_prices",

                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
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
                        name: "tax_fee",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },

                    {
                        name: "comission_fee",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },

                    {
                        name: "fixed_fee",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },

                    {
                        name: "expected_profit",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },

                    {
                        name: "practiced_sale_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0.0,
                    },

                    {
                        name: "suggested_sale_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0.0,
                    },

                    {
                        name: "real_profit",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0.0,
                    },

                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKMarketplaceSalePrice",
                        referencedTableName: "marketplaces",
                        referencedColumnNames: ["id"],
                        columnNames: ["marketplace_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKProductSalePrice",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["product_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sale_prices");
    }
}
