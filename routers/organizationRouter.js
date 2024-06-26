// Import necessary modules
import express from 'express'
import { getOrgs, getOrgbyID, createOrg, updateOrg, deleteOrg } from '../controllers/organizationController.js'

// Create a router instance
const router = express.Router();

// Route handler for API CRUD operations on Organization model
// (Requirement 1.5.0)
router.get('/', getOrgs)
router.get('/:id', getOrgbyID)
router.post('/', createOrg)
router.put('/:id', updateOrg)
router.delete('/:id', deleteOrg)

export default router
