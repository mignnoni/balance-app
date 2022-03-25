import { Router } from "express";

import { CreateSaleController } from "../../../../modules/sales/useCases/createSale/CreateSaleController";
import { CreateSaleWithDiferentPricesController } from "../../../../modules/sales/useCases/createSaleWithDiferentPrices/CreateSaleWithDiferentPricesController";
import { DeleteSaleController } from "../../../../modules/sales/useCases/deleteSale/DeleteSaleController";
import { ListSalesController } from "../../../../modules/sales/useCases/listSales/ListSalesController";
import { UpdateSaleQuantityController } from "../../../../modules/sales/useCases/updateSaleQuantity/UpdateSaleQuantityController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const salesRoutes = Router();

const createSaleController = new CreateSaleController();

const createSaleWithDiferentPricesController =
    new CreateSaleWithDiferentPricesController();

const listSalesController = new ListSalesController();

const updateSaleQuantityController = new UpdateSaleQuantityController();

const deleteSaleController = new DeleteSaleController();

salesRoutes.use(ensureAuthenticated);

salesRoutes.post("/:month", createSaleController.handle);

salesRoutes.post(
    "/other-price/:month",
    createSaleWithDiferentPricesController.handle
);

salesRoutes.get("/results", listSalesController.handle);

salesRoutes.put("/:id", updateSaleQuantityController.handle);

salesRoutes.delete("/:id", deleteSaleController.handle);

export { salesRoutes };
