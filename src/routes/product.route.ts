import express from 'express';
import { addNewProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller';


const router = express.Router();

router.get('/', getAllProducts);
router.get('/product/:id', getProductById);
router.post("/product", addNewProduct);
router.put("/product/:id", updateProduct);

export default router;