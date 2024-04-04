import db from 'mongoose'

const resourceSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    availability: {
        type: Date,
        required: true 
    },
    products: [],
    recurrence: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    availableQuantity: {
        required: true,
        type: Number
    }

})

export default db.model('Resource', resourceSchema)