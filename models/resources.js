import db from 'mongoose'

const resourceSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    availability: [{
        M: Boolean,
        T: Boolean,
        W: Boolean,
        Th: Boolean,
        F: Boolean,
        Sa: Boolean,
        Su: Boolean

    }],
    products: [{
        id: String,
        price: Number
    }],
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
    },
    organizationID: {
        type: String,
        required: true
    },
    start: String,
    end: String

})

export default db.model('Resource', resourceSchema)