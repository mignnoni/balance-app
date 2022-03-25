import { Router } from "express";

import { CreateMarketplaceController } from "../../../../modules/marketplaces/useCases/createMarketplace/CreateMarketplaceController";
import { DeleteMarketplaceController } from "../../../../modules/marketplaces/useCases/deleteMarketplace/DeleteMarketplaceController";
import { ListMarketplacesByUserController } from "../../../../modules/marketplaces/useCases/listMarketplacesByUser/ListMarketplacesByUserController";
import { UpdateMarketplaceController } from "../../../../modules/marketplaces/useCases/updateMarketplace/UpdateMarketplaceController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const marketplacesRoutes = Router();

const createMarketplaceController = new CreateMarketplaceController();

const listMarketplacesByUserController = new ListMarketplacesByUserController();

const updateMarketplaceController = new UpdateMarketplaceController();

const deleteMarketplaceController = new DeleteMarketplaceController();

marketplacesRoutes.post(
    "/",
    ensureAuthenticated,
    createMarketplaceController.handle
);

marketplacesRoutes.get(
    "/",
    ensureAuthenticated,
    listMarketplacesByUserController.handle
);

marketplacesRoutes.put(
    "/:id",
    ensureAuthenticated,
    updateMarketplaceController.handle
);

marketplacesRoutes.delete(
    "/:id",
    ensureAuthenticated,
    deleteMarketplaceController.handle
);

export { marketplacesRoutes };
