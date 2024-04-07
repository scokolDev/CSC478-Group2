// Import necessary modules
import express from 'express'
import Customer from '../models/customers.js'
import { checkAuthenticated } from '../routers/routes.js';

// Create a router instance
const router = express.Router();

//return all customers
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const customers = await Customer.find({"organizationID": req.user.organizationID})
        res.status(200).json(customers)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Create Customer
router.post('/', checkAuthenticated, async (req, res) => {
    req.body.organizationID = req.user.organizationID
    try {
        const customer = await Customer.create(req.body)
        res.status(200).json(customer)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//return customer by ID
router.get('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const customer = await Customer.findById(id)
        if(!customer){
            return res.status(404).json({message: `cannot find any customer with ID ${id}`})
        } else if (customer.organizationID && customer.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to access customer ${id}`})
        } else if (customer.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to access global customers ${id}`})
        }
        res.status(200).json(customer)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Customer
router.put('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const customer = await Customer.findById(id)
        if(!customer){
            return res.status(404).json({message: `cannot find any customer with ID ${id}`})
        } else if (customer.organizationID && customer.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to update customer ${id}`})
        } else if (customer.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to update global customers ${id}`})
        }
        await Customer.findByIdAndUpdate(id, req.body)
        const updatedCustomer = await Customer.findById(id);
        res.status(200).json(updatedCustomer)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Delete a Customer
router.delete('/:id', checkAuthenticated, async(req, res) =>{
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        if(!customer){
            return res.status(404).json({message: `cannot find any customer with ID ${id}`})
        } else if (customer.organizationID && customer.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to delete customer ${id}`})
        } else if (customer.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to delete global customers ${id}`})
        }
        await Customer.findByIdAndDelete(id);
        res.status(200).json(customer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router