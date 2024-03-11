import db from 'mongoose'

const productSchema = new db.Schema( {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    timeSlot: Date
})

export default db.model('Product', productSchema)