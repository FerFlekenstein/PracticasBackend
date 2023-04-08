import { Router } from "express";
import uploader from "../services/upload.js";
import { executePolicies } from "../middlewares/auth.js";
import productController from "../controllers/product.controller.js";
const router = new Router();
router.get("/", productController.getAll);
router.get("/:id", productController.getId);
router.post("/",  uploader.single("thumbnail"), productController.postProd);
router.put("/:id", productController.postProdAdmin);
router.delete("/:id", executePolicies("AUTHENTICATED"), productController.deleteProd);

export default router;