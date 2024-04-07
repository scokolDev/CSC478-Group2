import Organization from '../models/organizations.js'
import passport from 'passport'
import User from '../models/users.js'
import LocalStrategy from 'passport-local'

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

export const authenticateAdmin = passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  })

export const getAdminDash = (req, res) => {
    // Serve the Login.ejs file
    res.render('admin_dash.ejs', {orgName: req.body.organizationName});
  }

export const getAdminLogin = (req, res) => {
    res.render('admin_login.ejs')
}

export const getAdminListings = (req, res) => {
    // Serve the Login.ejs file
    res.render('admin_listings.ejs');
  }

export const getAdminModifyListing = (req, res) => {
    // Serve the Login.ejs file
    res.render('admin_modify_listing.ejs');
  }

export const getAdminRegister = (req, res) => {
    // Serve the Register.ejs file
    res.render('admin_register.ejs');
  }

export const registerAdmin = async (req, res) => {
    try {
      const organization = await Organization.create({
        name: req.body.organizationName,
        domain: req.body.organizationDomain
      });
  
      User.register(
        new User({
          username: req.body.email,
          email: req.body.email,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
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
