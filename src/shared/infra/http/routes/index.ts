import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { marketplacesRoutes } from "./marketplaces.routes";
import { passwordRoutes } from "./password.routes";
import { productsRoutes } from "./products.routes";
import { salesRoutes } from "./sales.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/", authenticateRoutes);
router.use("/products", productsRoutes);
router.use("/marketplaces", marketplacesRoutes);
router.use("/sales", salesRoutes);
router.use("/password", passwordRoutes);

export { router };
