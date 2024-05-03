import Organization from '../models/organizations.js'
import User from '../models/users.js'
import { updateRoute53 } from './organizationController.js'

// Method for returning Admin Dashboard
// (Requirement 1.0.0)
export const getAdminDash = (req, res) => {
    // Serve the Login.ejs file
    res.render('admin_dash.ejs', {orgName: req.body.organizationName});
  }

// Return the Admin Login Page
// (Requirement 1.4.0)
export const getAdminLogin = (req, res) => {
    res.render('login.ejs', {error: req.failureFlash})
}

// Method for returning Admin Listings
// (Requirement 1.1.0)
export const getAdminListings = (req, res) => {
    // Serve the Login.ejs file
    res.render('admin_listings.ejs');
  }
// Method for displaing the Admin Registration Page
// (Requirement 1.4.1)
export const getAdminRegister = (req, res) => {
    // Serve the Register.ejs file
    res.render('admin_register.ejs');
  }

// Method for rendering Admin Resources
// (Requirement 3.2.0)
export const getAdminResource = (req, res) => {
    // Serve the resource.ejs file
    res.render('admin_resources.ejs')
}

// Route handler for Modify Listings
// (Requirement 3.2.0)
export const getAdminModifyListing = (req, res) => {
  // Serve the admin_modify_listing.ejs file
  res.render('admin_modify_listing.ejs')
}

// Method for rendering Order Details 
// (Requirement 1.0.4)
export const getAdminOrderDetails = (req, res) => {
  // Serve the admin_order_details.ejs file
  res.render('admin_order_details.ejs')
}

// Method for rendering Admin Orders
// (Requirement 1.0.1)
export const getAdminOrders = (req, res) => {
  // Serve the admin_orders.ejs file
  res.render('admin_orders.ejs')
}

// Method for processing Admin Registration information
// (Requirement 1.4.1)
export const registerAdmin = async (req, res) => {
    try {
      const organization = await Organization.create({
        name: req.body.organizationName,
        domain: req.body.organizationDomain
      });

      updateRoute53(req.body.organizationDomain);
  
      User.register(
        new User({
          username: req.body.email,
          email: req.body.email,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          admin: true,
          organizationID: organization._id
      }), req.body.password, function (err, msg) {
        if (err) {
          //res.send(err)
          res.status(500).json({message: err.message})
        } else {
          res.redirect('/admin/login')
        }
      })
    } catch (err) {
      res.status(500).json({message: err.message});
    }  
  }
