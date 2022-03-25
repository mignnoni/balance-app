import { getRepository, Repository } from "typeorm";

import { ICreateSalePriceDTO } from "../../../dto/ICreateSalePriceDTO";
import { IUpdateSalePriceDTO } from "../../../dto/IUpdateSalePriceDTO";
import { ISalePricesRepository } from "../../../repositories/ISalePricesRepository";
import { SalePrice } from "../entities/SalePrice";

class SalePricesRepository implements ISalePricesRepository {
    private repository: Repository<SalePrice>;

    constructor() {
        this.repository = getRepository(SalePrice);
    }

    async create({
        product_id,
        marketplace_id,
        tax_fee,
        comission_fee,
        fixed_fee,
        expected_profit,
        practiced_sale_price,
    }: ICreateSalePriceDTO): Promise<SalePrice> {
        const salePrice = this.repository.create({
            product_id,
            marketplace_id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });

        await this.repository.save(salePrice);

        return salePrice;
    }

    async findByProductId(product_id: string): Promise<SalePrice[]> {
        const productSalePrices = await this.repository.find({ product_id });

        return productSalePrices;
    }

    async findByProductAndMarketplace(
        product_id: string,
        marketplace_id: string
    ): Promise<SalePrice> {
        const sale_price = await this.repository
            .createQueryBuilder()
            .where("product_id = :product_id", { product_id })
            .andWhere("marketplace_id = :marketplace_id", { marketplace_id })
            .getOne();

        return sale_price;
    }

    async findById(id: string): Promise<SalePrice> {
        const salePrice = await this.repository.findOne(id);

        return salePrice;
    }

    async update({
        id,
        tax_fee,
        comission_fee,
        fixed_fee,
        expected_profit,
        practiced_sale_price,
    }: IUpdateSalePriceDTO): Promise<void> {
        const updateSalePrice = this.repository.create({
            id,
            tax_fee,
            comission_fee,
            fixed_fee,
            expected_profit,
            practiced_sale_price,
        });

        await this.repository.save(updateSalePrice);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { SalePricesRepository };
