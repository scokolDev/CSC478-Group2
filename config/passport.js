import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/users.js'
import Customer from '../models/customers.js'


// (Requirement 1.4.0, 6.2.0)
function SessionConstructor(userId, userGroup, details) {

    this.userId = userId;
  
    this.userGroup = userGroup;
  
    this.details = details;
  
  }

// (Requirement 1.4.0, 6.2.0)
const PassportConfig = function(passport) {

    passport.serializeUser(function (userObject, done) {

        // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    
        let userGroup = "user";
    
        let userPrototype =  Object.getPrototypeOf(userObject);
    
    
        if (userPrototype === User.prototype) {
    
          userGroup = "user";
    
        } else if (userPrototype === Customer.prototype) {
    
          userGroup = "customer";
    
        }
    
    
        let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    
        done(null,sessionConstructor);
    
      });


      passport.deserializeUser(async (sessionConstructor, done) => {
        try {
            if (sessionConstructor.userGroup === 'user') {
                const user = await User.findById(sessionConstructor.userId).select('-password');
                done(null, user);
            } else if (sessionConstructor.userGroup === 'customer') {
                const customer = await Customer.findById(sessionConstructor.userId).select('-password');
                done(null, customer);
            }
        } catch (error) {
            done(error);
        }
    });


    passport.use('user', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.authenticate()(email, password, done);
    }));

    passport.use('customer', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        Customer.authenticate()(email, password, done);
    }));

}

export default PassportConfig