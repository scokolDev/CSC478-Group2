// Import necessary modules
import express from 'express'
import Product from '../models/products.js'
import { checkAuthenticated } from '../routes.js';

// Create a router instance
const router = express.Router();

//return all products
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Create Product
router.post('/', checkAuthenticated, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//return product by ID
router.get('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Product
router.put('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Delete a Product
router.delete('/:id', checkAuthenticated, async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router