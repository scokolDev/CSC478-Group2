// Import necessary modules
import express from 'express'
import { checkAuthenticated, getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js';
import { createProduct, deleteProduct, getProductByID, getProducts, updateProduct } from '../controllers/productController.js';


// Create a router instance
const router = express.Router();



//return all products
router.get('/', getVhost, getOrgByDomain, getProducts)

//Create Product
router.post('/', checkAuthenticated, createProduct)

//return product by ID
router.get('/:id', checkAuthenticated, getProductByID)

//Update Product
router.put('/:id', checkAuthenticated, updateProduct)

//Delete a Product
router.delete('/:id', checkAuthenticated, deleteProduct)




export default router