const db = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const customerSchema = new db.Schema( {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    organizationID: Number

})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

module.exports = db.model('Customer', customerSchema)