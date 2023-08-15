import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts } from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/jwt.js';


const router = express.Router();


router.post('/', verifyToken,createProduct)
router.delete('/:id', verifyToken,deleteProduct)
router.get('/single/:id',getProduct)
router.get('/',getProducts)


export default router;