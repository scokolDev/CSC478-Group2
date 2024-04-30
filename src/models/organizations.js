import db from 'mongoose'

const organizationSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    phone: String,
    domain: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
})

export default db.model('Organization', organizationSchema)