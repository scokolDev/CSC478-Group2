import db from 'mongoose'

const locationSchema = new db.Schema( {
    address: {
        type: String,
        required: true 
    },
    addressLineTwo: String,
    city: { 
        type: String,
        required: true 
    },
    state: {
        type: String,
        required: true 
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        required: true,
        type: String
    },
    customerID: {
        type: String,
        required: true
    }
})

export default db.model('Location', locationSchema)