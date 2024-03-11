import db from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'


const userSchema = new db.Schema( {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    organizationID: Number

})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

export default db.model('User', userSchema)
