import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { ProductsRepository } from "../../../../modules/products/infra/typeorm/repositories/ProductsRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureIsTheSameUser(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { product_id } = request.params || request.query;
    const { id: user_id } = request.user;

    if (product_id && product_id !== "undefined") {
        const productsRepository = container.resolve(ProductsRepository);

        const product = await productsRepository.findById(String(product_id));

        if (!product) {
            throw new AppError("Product not found");
        }

        if (product.user_id !== user_id) {
            throw new AppError("Incorrect user");
        }
    }

    return next();
}
