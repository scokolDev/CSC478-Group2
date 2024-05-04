// Import necessary modules
import Customer from '../models/customers.js'



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

// Method for Customer Dashboard
// (Requirement 6.0.0)
export const getCustomerDash = (req, res) => {
    // Serve the Customer Dash file
    res.render('customer_dash.ejs', {firstName: req.user.firstName, customerID:req.user._id});
  }

// Method for serving the Customer login page
// (Requirement 6.2.0)
export const getCustomerLogin = (req, res) => {
    res.render('customer_login.ejs', {message: req.failureFlash})
}


export const getCustomerOrderLogin = (req, res) => {
    res.render('customer_order_login.ejs', {message: req.failureFlash})
}


// Method for Customer Orders
// (Requirement 6.0.1)
export const getCustomerOrders = (req, res) => {
    // Serve the Customer Orders file
    res.render('customer_orders.ejs', {customerID: req.user._id});
  }

// Method for Modify Customer Order page
// (Requirement 6.0.4)
export const getCustomerModifyOrder = (req, res) => {
    console.log("--------------------" + req.body.organizationName)
    // Serve the Customer Modify Order page
    res.render('customer_order_details.ejs', {orgName: req.body.organizationName});
  }

// Method for Customer Registration Page
// (Requirement 6.2.1)
export const getCustomerRegister = (req, res) => {
    // Serve the Register.ejs file
    res.render('customer_register.ejs');
  }

// Method for processing Customer Registration Data
// (Requirement 6.2.1)
export const registerCustomer = async (req, res) => {
    try {  
        Customer.register(
            new Customer({
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            organizationID: req.body.organizationID
        }), req.body.password, function (err, msg) {
            if (err) {
            //res.send(err)
            res.status(500).json({message: err.message})
            } else {
                if(!req.body.order){
                    res.redirect('/customer/login')
                }else{
                    res.status(200).json(msg)
                }
                
            }
        })
    } catch (err) {
      res.status(500).json({message: err.message});
    }  
  }

 // Method for turning a subdomain into variable held in the request body
 // Simplify updating user's organization by converting subdomain into variable in req.body 
export const getDomain = async (req, res) => {
    if (req.vhost) {
        return req.body.orgdomain = req.vhost[0]
      }
}