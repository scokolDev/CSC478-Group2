import db from 'mongoose'

const orderSchema = new db.Schema({
    orderNumber: Number,
    user: String,
    products: String,
    scheduledTime: Date,
    status: String

})

export default db.model('Order', orderSchema)