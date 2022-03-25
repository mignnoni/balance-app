import { getRepository, Repository } from "typeorm";

import { ICreateSaleDTO } from "../../../dto/ICreateSaleDTO";
import { IFindSaleByUserDTO } from "../../../dto/IFindSaleByUserDTO";
import { IFindSaleDTO } from "../../../dto/IFindSaleDTO";
import { ISalesRepository } from "../../../repositories/ISalesRepository";
import { Sale } from "../entities/Sale";

class SalesRepository implements ISalesRepository {
    private repository: Repository<Sale>;
    constructor() {
        this.repository = getRepository(Sale);
    }

    async create({
        id,
        user_id,
        product_id,
        marketplace_id,
        month,
        quantity,
        profit,
    }: ICreateSaleDTO): Promise<void> {
        const sale = this.repository.create({
            id,
            user_id,
            product_id,
            marketplace_id,
            month,
            quantity,
            profit,
        });

        await this.repository.save(sale);
    }
    async findByProductAndMarketplaceAndMonth({
        product_id,
        marketplace_id,
        month,
    }: IFindSaleDTO): Promise<Sale> {
        const sale = await this.repository
            .createQueryBuilder()
            .where("product_id = :product_id", { product_id })
            .andWhere("marketplace_id = :marketplace_id", { marketplace_id })
            .andWhere("month = :month", { month })
            .getOne();

        return sale;
    }

    async findSalesByUser({
        user_id,
        month,
        product_id,
        marketplace_id,
    }: IFindSaleByUserDTO): Promise<Sale[]> {
        const salesQuery = this.repository
            .createQueryBuilder("c")
            .where("user_id = :user_id", { user_id });

        if (month) {
            salesQuery.andWhere("month = :month", { month });
        }

        if (product_id !== "undefined") {
            salesQuery.andWhere("product_id = :product_id", { product_id });
        }

        if (marketplace_id !== "undefined") {
            salesQuery.andWhere("marketplace_id = :marketplace_id", {
                marketplace_id,
            });
        }

        const sales = await salesQuery.getMany();

        return sales;
    }

    async findById(id: string): Promise<Sale> {
        const sale = await this.repository.findOne(id);

        return sale;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { SalesRepository };
