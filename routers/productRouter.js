// Import necessary modules
import express from 'express'
import { checkAdminAuthenticated, checkCustomerAuthenticated, getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js';
import { createProduct, deleteProduct, getProductByID, getProducts, updateProduct } from '../controllers/productController.js';


// Create a router instance
const router = express.Router();



//return all products
// (Requirement 2.0.0)
router.get('/', getVhost, getOrgByDomain, getProducts)

//Create Product
// (Requirement 2.2.0)
router.post('/', checkAdminAuthenticated, createProduct)

//return product by ID
// (Requirement 2.3.x)
router.get('/:id', checkCustomerAuthenticated, getProductByID)

//Update Product
// (Requirement 2.3.3, 2.3.4)
router.put('/:id', checkAdminAuthenticated, updateProduct)

//Delete a Product
// (Requirement 2.3.2)
router.delete('/:id', checkAdminAuthenticated, deleteProduct)




export default router