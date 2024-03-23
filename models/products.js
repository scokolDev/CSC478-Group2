import db from 'mongoose'

const productSchema = new db.Schema( {
    name: String,
    description: String,
    price: Number,
    priceType: ['Flat Rate', 'Per Hour', 'Per Day'],
    category: String,
    image: String,
    timeSlot: Date,
    display: Boolean
})

export default db.model('Product', productSchema)