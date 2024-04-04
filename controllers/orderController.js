// Import necessary modules
import express from 'express'
import Order from '../models/orders.js'
import { checkAuthenticated } from '../routers/routes.js';

// Create a router instance
const router = express.Router();

//return all orders
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const orders = await Order.find({"organizationID": req.user.organizationID})
        res.status(200).json(orders)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Create Order
router.post('/', checkAuthenticated, async (req, res) => {
    req.body.organizationID = req.user.organizationID
    try {
        const order = await Order.create(req.body)
        res.status(200).json(order)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//return order by ID
router.get('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findById(id, {"organizationID": req.user.organizationID})
        res.status(200).json(order)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Order
router.put('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findByIdAndUpdate(id, req.body)
        if(!order){
            return res.status(404).json({message: `cannot find any order with ID ${id}`})
        }
        const updatedOrder = await Order.findById(id);
        res.status(200).json(updatedOrder)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Delete a Order
router.delete('/:id', checkAuthenticated, async(req, res) =>{
    try {
        const {id} = req.params;
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({message: `cannot find any order with ID ${id}`})
        }
        res.status(200).json(order);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router