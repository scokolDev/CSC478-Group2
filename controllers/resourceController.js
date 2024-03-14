// Import necessary modules
import express from 'express'
import Resource from '../models/resources.js'
import { checkAuthenticated } from '../routes.js';

// Create a router instance
const router = express.Router();

//return all resources
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const resources = await Resource.find({})
        res.status(200).json(resources)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Create Resource
router.post('/', checkAuthenticated, async (req, res) => {
    try {
        const resource = await Resource.create(req.body)
        res.status(200).json(resource)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//return resource by ID
router.get('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const resource = await Resource.findById(id)
        res.status(200).json(resource)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Resource
router.put('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const resource = await Resource.findByIdAndUpdate(id, req.body)
        if(!resource){
            return res.status(404).json({message: `cannot find any resource with ID ${id}`})
        }
        const updatedResource = await Resource.findById(id);
        res.status(200).json(updatedResource)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Delete a Resource
router.delete('/:id', checkAuthenticated, async(req, res) =>{
    try {
        const {id} = req.params;
        const resource = await Resource.findByIdAndDelete(id);
        if(!resource){
            return res.status(404).json({message: `cannot find any resource with ID ${id}`})
        }
        res.status(200).json(resource);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router