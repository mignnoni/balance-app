import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AlterSalePriceAddProductTotalCost1647700528614
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "sale_prices",

            new TableForeignKey({
                name: "FKProductSalePrice",
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                columnNames: ["product_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("sale_prices", "FKProductSalePrice");
    }
}
