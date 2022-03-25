import { container } from "tsyringe";

import "./providers";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../modules/accounts/repositories/IUserTokensRepository";
import { MarketplacesRepository } from "../../modules/marketplaces/infra/typeorm/repositories/MarketplacesRepository";
import { IMarketplacesRepository } from "../../modules/marketplaces/repositories/IMarketplacesRepository";
import { SalePricesRepository } from "../../modules/prices/infra/typeorm/repositories/SalePricesRepository";
import { ISalePricesRepository } from "../../modules/prices/repositories/ISalePricesRepository";
import { KitProductsRepository } from "../../modules/products/infra/typeorm/repositories/KitProductsRepository";
import { ProductsCostsRepository } from "../../modules/products/infra/typeorm/repositories/ProductsCostsRepository";
import { ProductsRepository } from "../../modules/products/infra/typeorm/repositories/ProductsRepository";
import { IKitProductsRepository } from "../../modules/products/repositories/IKitProductsRepository";
import { IProductsCostsRepository } from "../../modules/products/repositories/IProductsCostsRepository";
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository";
import { SalesRepository } from "../../modules/sales/infra/typeorm/repositories/SalesRepository";
import { ISalesRepository } from "../../modules/sales/repositories/ISalesRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
);

container.registerSingleton<IKitProductsRepository>(
    "KitProductsRepository",
    KitProductsRepository
);

container.registerSingleton<IProductsCostsRepository>(
    "ProductsCostsRepository",
    ProductsCostsRepository
);

container.registerSingleton<IMarketplacesRepository>(
    "MarketplacesRepository",
    MarketplacesRepository
);

container.registerSingleton<ISalePricesRepository>(
    "SalePricesRepository",
    SalePricesRepository
);

container.registerSingleton<ISalesRepository>(
    "SalesRepository",
    SalesRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
