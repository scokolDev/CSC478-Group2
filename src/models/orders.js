import db from 'mongoose'

const orderSchema = new db.Schema({
    orderNumber: {
        type: Number,
        unique: true 
    },
    customerID: {
        type: String,
        required: true
    },
    products: [],
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    organizationID: {
        type: String,
        required: true
    },
    resourceID: {
        type: String,
        required: true
    }

})

export default db.model('Order', orderSchema)