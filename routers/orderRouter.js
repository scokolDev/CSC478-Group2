// Import necessary modules

import express from 'express'

import { checkAuthenticated } from './routes.js';
import { getVhost } from './routes.js';
import { getOrgByDomain } from '../controllers/organizationController.js'
import { createOrder, createPaymentIntent, deleteOrder, getOrderById, getOrders, getPaymentNext, getSuccess, updateOrder, webhook } from '../controllers/orderController.js';



// Create a router instance
const router = express.Router();

//return all orders
// (Requirement 1.0.0)
router.get('/', checkAuthenticated, getOrders)

//Create Order
// (Requirement 5.6.0 )
router.post('/', getVhost, getOrgByDomain, createOrder)

//return order by ID
// (Requirement 1.0.4)
router.get('/:id', checkAuthenticated, getOrderById)

//Update Order
router.put('/:id', checkAuthenticated, updateOrder)

//Delete a Order
router.delete('/:id', checkAuthenticated, deleteOrder)


// Stripe Integration for procesing credit cards
// (Requirement 5.4.0)
router.post('/create-payment-intent', createPaymentIntent);

// Stripe Integration for procesing credit cards
// (Requirement 5.4.0)
router.get('/payment/next', getPaymentNext);

// Stripe Integration for procesing credit cards
// (Requirement 5.4.0)
router.get('/success', getSuccess);

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
// Stripe Integration for procesing credit cards
// (Requirement 5.4.0)
router.post('/webhook', webhook);

export default router