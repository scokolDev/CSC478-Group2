import db from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const customerSchema = new db.Schema( {
    email: {
        type: String,
        required: true,
        unique: true 
    },
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String, 
        required: true
    },
    birthDate: Date,
    organizationID: {
        type: String, 
        required: true 
    },

})

customerSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

export default db.model('Customer', customerSchema)