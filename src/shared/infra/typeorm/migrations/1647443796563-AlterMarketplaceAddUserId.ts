import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AlterMarketplaceAddUserId1647443796563
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "marketplaces",

            new TableColumn({
                name: "user_id",
                type: "uuid",
            })
        );

        await queryRunner.createForeignKey(
            "marketplaces",

            new TableForeignKey({
                name: "FKUserMarketplace",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("marketplaces", "FKUserMarketplace");

        await queryRunner.dropColumn("marketplaces", "user_id");
    }
}
