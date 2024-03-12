import db from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const customerSchema = new db.Schema( {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    organizationID: Number

})

customerSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

export default db.model('Customer', customerSchema)