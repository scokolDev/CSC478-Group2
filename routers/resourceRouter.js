// Import necessary modules
import express from 'express'

import { checkAdminAuthenticated, checkCustomerAuthenticated, getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js';
import { createResource, deleteResource, getResourceByID, getResources, updateResource } from '../controllers/resourceController.js';

// Create a router instance
const router = express.Router();

//return all resources
// (Requirement 3.0.0)
router.get('/', getVhost, getOrgByDomain, getResources)

//Create Resource
// (Requirement 3.1.0)
router.post('/', checkAdminAuthenticated, createResource)

//return resource by ID
// (Requirement 3.2.0)
router.get('/:id', checkCustomerAuthenticated, getResourceByID)

//Update Resource
// (Requirement 3.2.0, 3.4.0)
router.put('/:id', checkAdminAuthenticated, updateResource)

//Delete a Resource
// (Requirement 3.3.0)
router.delete('/:id', checkAdminAuthenticated, deleteResource)

export default router