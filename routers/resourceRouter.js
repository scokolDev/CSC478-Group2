// Import necessary modules
import express from 'express'
import Resource from '../models/resources.js'
import { checkAuthenticated, getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js';
import { createResource, deleteResource, getResourceByID, getResources, updateResource } from '../controllers/resourceController.js';

// Create a router instance
const router = express.Router();

//return all resources
router.get('/', getVhost, getOrgByDomain, getResources)

//Create Resource
router.post('/', checkAuthenticated, createResource)

//return resource by ID
router.get('/:id', checkAuthenticated, getResourceByID)

//Update Resource
router.put('/:id', checkAuthenticated, updateResource)

//Delete a Resource
router.delete('/:id', checkAuthenticated, deleteResource)

export default router