// Import necessary modules
import express from 'express'
import Resource from '../models/resources.js'
import { checkAuthenticated, getVhost } from '../routers/routes.js';
import { getOrgByDomain } from './organizationController.js';

// Create a router instance
const router = express.Router();

//return all resources
router.get('/', getVhost, getOrgByDomain, async (req, res) => {
    const orgID = req.user != undefined ? req.user.organizationID : req.body.organizationID
    req.query.organizationID = orgID;
    //const query = {products: {$in : [req.query.products]}};
    try {
        const resources = await Resource.find(req.query);
        res.status(200).json(resources)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Create Resource
router.post('/', checkAuthenticated, async (req, res) => {
    req.body.organizationID = req.user.organizationID
    try {
        const resource = await Resource.create(req.body)
        res.status(200).json(resource)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//return resource by ID
router.get('/:id', getVhost, getOrgByDomain, async (req, res) => {
    const {id} = req.params
    try {
        const resource = await Resource.findById(id)
        if(!resource){
            return res.status(404).json({message: `cannot find any resource with ID ${id}`})
        } else if (resource.organizationID && resource.organizationID != req.body.organizationID) {
            return res.status(401).json({message: `Not authorized to access ${id}`})
        } else if (!resource.organizationID) {
            return res.status(401).json({message: `Not authorized to access global resources ${id}`})
        }
        res.status(200).json(resource)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Resource
router.put('/:id', checkAuthenticated, async (req, res) => {
    req.body.organizationID = req.user.organizationID
    const {id} = req.params
    try {
        const resource = await Resource.findById(id)
        if(!resource){
            return res.status(404).json({message: `cannot find any resource with ID ${id}`})
        } else if (resource.organizationID && resource.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to modify resource ${id}`})
        } else if (resource.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to modify global resources ${id}`})
        }
        await Resource.findByIdAndUpdate(id, req.body)
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
        } else if (resource.organizationID && resource.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to delete resource ${id}`})
        } else if (resource.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to delete global resources ${id}`})
        }
        res.status(200).json(resource);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router