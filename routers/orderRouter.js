// Import necessary modules

import express from 'express'

import { checkAuthenticated } from './routes.js';
import { getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js'
import { createOrder, createPaymentIntent, deleteOrder, getOrderById, getOrders, getPaymentNext, getSuccess, updateOrder, webhook } from '../controllers/orderController.js';



// Create a router instance
const router = express.Router();

//return all orders
router.get('/', checkAuthenticated, getOrders)

//Create Order
router.post('/', getVhost, getOrgByDomain, createOrder)

//return order by ID
router.get('/:id', checkAuthenticated, getOrderById)

//Update Order
router.put('/:id', checkAuthenticated, updateOrder)

//Delete a Order
router.delete('/:id', checkAuthenticated, deleteOrder)



router.post('/create-payment-intent', createPaymentIntent);

router.get('/payment/next', getPaymentNext);

router.get('/success', getSuccess);

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
router.post('/webhook', webhook);

export default router