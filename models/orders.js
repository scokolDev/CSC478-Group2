const db = require('mongoose')

const orderSchema = new db.Schema({
    orderNumber: Number,
    user: String,
    products: String,
    scheduledTime: Date,
    status: String

})

module.exports = db.model('Order', orderSchema)