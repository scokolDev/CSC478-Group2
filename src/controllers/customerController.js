// Import necessary modules
import Customer from '../models/customers.js'



// export const authenticateCustomer = passport.authenticate('customer', {
//     successRedirect: '/customer/dashboard',
//     failureRedirect: '/customer/login',
//     failureFlash: true
//   })

// Create a router instance
//const router = express.Router();

//return all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({"organizationID": req.user.organizationID})
        res.status(200).json(customers)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

}

//return customer by ID
export const getCustomerByID = async (req, res) => {
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

}

//Update Customer
export const updateCustomer = async (req, res) => {
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

}

//Delete a Customer
export const deleteCustomer = async(req, res) =>{
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
}

export const getCustomerDash = (req, res) => {
    // Serve the Customer Dash file
    res.render('customer_dash.ejs', {firstName: req.user.firstName});
  }

export const getCustomerLogin = (req, res) => {
    res.render('customer_login.ejs', {message: req.failureFlash})
}

export const getCustomerOrders = (req, res) => {
    // Serve the Customer Orders file
    res.render('customer_orders.ejs');
  }

export const getCustomerModifyOrder = (req, res) => {
    // Serve the Customer Modify Order page
    res.render('customer_modify_order.ejs');
  }

export const getCustomerRegister = (req, res) => {
    // Serve the Register.ejs file
    res.render('customer_register.ejs');
  }

export const registerCustomer = async (req, res) => {
    try {  
      Customer.register(
        new Customer({
          username: req.body.email,
          email: req.body.email,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          organizationID: "TESTID"
      }), req.body.password, function (err, msg) {
        if (err) {
          //res.send(err)
          res.status(500).json({message: err.message})
        } else {
          res.redirect('/customer/login')
        }
      })
    } catch (err) {
      res.status(500).json({message: err.message});
    }  
  }

export const getDomain = async (req, res) => {
    if (req.vhost) {
        return req.body.orgdomain = req.vhost[0]
      }
}
