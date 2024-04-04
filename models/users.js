import db from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'


const userSchema = new db.Schema( {
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    admin: {
        type: Boolean,
        default: false
    },
    organizationID: {
        type: String,
        required: true 
    }

})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

export default db.model('User', userSchema)
