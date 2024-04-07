// Import necessary modules
import express from 'express'
import { getLocs, getLocbyID, createLoc, updateLoc, deleteLoc } from '../controllers/locationController.js'

// Create a router instance
const router = express.Router();

router.get('/', getLocs)
router.get('/:id', getLocbyID)
router.post('/', createLoc)
router.put('/:id', updateLoc)
router.delete('/:id', deleteLoc)

export default router
