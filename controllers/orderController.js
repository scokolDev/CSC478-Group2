// Import necessary modules
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
  }
import express from 'express'
import Order from '../models/orders.js'
import { checkAuthenticated } from '../routers/routes.js';
import Stripe from 'stripe'

//Initialize stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const calculateTax = false;

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
        const order = await Order.findById(id)
        if(!order){
            return res.status(404).json({message: `cannot find any order with ID ${id}`})
        } else if (order.organizationID && order.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to access order ${id}`})
        } else if (order.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to access global orders ${id}`})
        }
        res.status(200).json(order)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

})

//Update Order
router.put('/:id', checkAuthenticated, async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findById(id)
        if(!order){
            return res.status(404).json({message: `cannot find any order with ID ${id}`})
        } else if (order.organizationID && order.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to update order ${id}`})
        } else if (order.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to update global orders ${id}`})
        }
        await Order.findByIdAndUpdate(id, req.body)
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
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message: `cannot find any order with ID ${id}`})
        } else if (order.organizationID && order.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to delete order ${id}`})
        } else if (order.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to delete global orders ${id}`})
        }
        await Order.findByIdAndDelete(id);
        res.status(200).json(order);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

const calculate_tax = async (orderAmount, currency) => {
    const taxCalculation = await stripe.tax.calculations.create({
      currency,
      customer_details: {
        address: {
          line1: "10709 Cleary Blvd",
          city: "Plantation",
          state: "FL",
          postal_code: "33322",
          country: "US",
        },
        address_source: "shipping",
      },
      line_items: [
        {
          amount: orderAmount,
          reference: "ProductRef",
          tax_behavior: "exclusive",
          tax_code: "txcd_30011000"
        }
      ],
    });
  
    return taxCalculation;
  };
  
  router.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodType, currency, paymentMethodOptions } = req.body;
  
    // Each payment method type has support for different currencies. In order to
    // support many payment method types and several currencies, this server
    // endpoint accepts both the payment method type and the currency as
    // parameters. To get compatible payment method types, pass 
    // `automatic_payment_methods[enabled]=true` and enable types in your dashboard 
    // at https://dashboard.stripe.com/settings/payment_methods.
    //
    // Some example payment method types include `card`, `ideal`, and `link`.
    let orderAmount = 1400;
    let params = {};
  
    if (calculateTax) {
      let taxCalculation = await calculate_tax(orderAmount, currency)
      params = {
        payment_method_types: paymentMethodType === 'link' ? ['link', 'card'] : [paymentMethodType],
        amount: taxCalculation.amount_total,
        currency: currency,
        metadata: { tax_calculation: taxCalculation.id }
      }
    }
    else {
      params = {
        payment_method_types: paymentMethodType === 'link' ? ['link', 'card'] : [paymentMethodType],
        amount: orderAmount,
        currency: currency,
      }
    }
    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if (paymentMethodType === 'acss_debit') {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
      }
    } else if (paymentMethodType === 'konbini') {
      /**
       * Default value of the payment_method_options
       */
      params.payment_method_options = {
        konbini: {
          product_description: 'Tシャツ',
          expires_after_days: 3,
        },
      }
    } else if (paymentMethodType === 'customer_balance') {
      params.payment_method_data = {
        type: 'customer_balance',
      }
      params.confirm = true
      params.customer = req.body.customerId || await stripe.customers.create().then(data => data.id)
    }
  
    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions
    }
  
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    try {
      const paymentIntent = await stripe.paymentIntents.create(params);
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  
  router.get('/payment/next', async (req, res) => {
    const intent = await stripe.paymentIntents.retrieve(
      req.query.payment_intent,
      {
        expand: ['payment_method'],
      }
    );
  
    res.redirect(`/api/orders/success?payment_intent_client_secret=${intent.client_secret}`);
  });
  
  router.get('/success', async (req, res) => {
    const path = resolve(process.env.STATIC_DIR + '/success.html');
    res.sendFile(path);
  });
  
  // Expose a endpoint as a webhook handler for asynchronous events.
  // Configure your webhook in the stripe developer dashboard
  // https://dashboard.stripe.com/test/webhooks
  router.post('/webhook', async (req, res) => {
    let data, eventType;
  
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
  });
export default router