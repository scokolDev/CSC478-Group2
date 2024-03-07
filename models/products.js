const db = require('mongoose')

const productSchema = new db.Schema( {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    timeSlot: Date
})

module.exports = db.model('Product', productSchema)