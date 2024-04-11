import db from 'mongoose'

const productSchema = new db.Schema( {
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description: String,
    price: { 
        type: Number,
        required: true 
    },
    priceType: ['Flat Rate', 'Per Hour', 'Per Day'],
    category: {
        type: String,
        required: true 
    },
    image: String,
    timeSlot: Date,
    display: Boolean,
    organizationID: {
        type: String,
        required: true
    },
    resources: []
})

export default db.model('Product', productSchema)