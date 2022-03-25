import { Router } from "express";

import { CreateSalePriceController } from "../../../../modules/prices/useCases/createSalePrice/CreateSalePriceController";
import { DeleteSalePriceController } from "../../../../modules/prices/useCases/deleteSalePrice/DeleteSalePriceController";
import { ListSalePricesByProductController } from "../../../../modules/prices/useCases/listSalePricesByProduct/ListSalePricesByProductController";
import { UpdateSalePriceController } from "../../../../modules/prices/useCases/updateSalePrice/UpdateSalePriceController";
import { CreateKitProductController } from "../../../../modules/products/useCases/createKitProduct/CreateKitProductController";
import { CreateProductController } from "../../../../modules/products/useCases/createProduct/CreateProductController";
import { CreateProductCostController } from "../../../../modules/products/useCases/createProductCost/CreateProductCostController";
import { DeleteKitProductController } from "../../../../modules/products/useCases/deleteKitProduct/DeleteKitProductController";
import { DeleteProductController } from "../../../../modules/products/useCases/deleteProduct/DeleteProductController";
import { DeleteProductCostController } from "../../../../modules/products/useCases/deleteProductCost/DeleteProductCostController";
import { ListKitProductsController } from "../../../../modules/products/useCases/listKitProducts/ListKitProductsController";
import { ListProductCostsController } from "../../../../modules/products/useCases/listProductCosts/ListProductCostsController";
import { ListProductsByUserController } from "../../../../modules/products/useCases/listProductsByUser/ListProductsByUserController";
import { UpdateProductController } from "../../../../modules/products/useCases/updateProduct/UpdateProductController";
import { UpdateProductCostController } from "../../../../modules/products/useCases/updateProductCost/UpdateProductCostController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsTheSameUser } from "../middlewares/ensureIsTheSameUser";

const productsRoutes = Router();

const createProductController = new CreateProductController();

const createKitProductController = new CreateKitProductController();

const listProductsByUserController = new ListProductsByUserController();

const listKitProductsController = new ListKitProductsController();

const createProductCostController = new CreateProductCostController();

const listProductCostsController = new ListProductCostsController();

const createSalePriceController = new CreateSalePriceController();

const deleteProductController = new DeleteProductController();

const deleteKitProductController = new DeleteKitProductController();

const listSalePricesByProductController =
    new ListSalePricesByProductController();

const updateProductController = new UpdateProductController();

const updateSalePriceController = new UpdateSalePriceController();

const deleteSalePriceController = new DeleteSalePriceController();

const updateProductCostController = new UpdateProductCostController();

const deleteProductCostController = new DeleteProductCostController();

productsRoutes.post("/", ensureAuthenticated, createProductController.handle);

productsRoutes.get(
    "/",
    ensureAuthenticated,
    listProductsByUserController.handle
);

productsRoutes.put(
    "/:product_id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    updateProductController.handle
);

productsRoutes.delete(
    "/:product_id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    deleteProductController.handle
);

productsRoutes.post(
    "/:product_id/kit",
    ensureAuthenticated,
    ensureIsTheSameUser,
    createKitProductController.handle
);

productsRoutes.get(
    "/:product_id/kit",
    ensureAuthenticated,
    ensureIsTheSameUser,
    listKitProductsController.handle
);

productsRoutes.delete(
    "/:product_id/kit/:id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    deleteKitProductController.handle
);

productsRoutes.post(
    "/:product_id/costs",
    ensureAuthenticated,
    ensureIsTheSameUser,
    createProductCostController.handle
);

productsRoutes.get(
    "/:product_id/costs",
    ensureAuthenticated,
    ensureIsTheSameUser,
    listProductCostsController.handle
);

productsRoutes.put(
    "/:product_id/costs/:id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    updateProductCostController.handle
);

productsRoutes.delete(
    "/:product_id/costs/:id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    deleteProductCostController.handle
);

productsRoutes.post(
    "/:product_id/sale-prices",
    ensureAuthenticated,
    ensureIsTheSameUser,
    createSalePriceController.handle
);

productsRoutes.get(
    "/:product_id/sale-prices",
    ensureAuthenticated,
    ensureIsTheSameUser,
    listSalePricesByProductController.handle
);

productsRoutes.put(
    "/:product_id/sale-prices/:id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    updateSalePriceController.handle
);

productsRoutes.delete(
    "/:product_id/sale-prices/:id",
    ensureAuthenticated,
    ensureIsTheSameUser,
    deleteSalePriceController.handle
);

export { productsRoutes };
