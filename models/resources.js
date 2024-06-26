import db from 'mongoose'

const resourceSchema = new db.Schema({
    organizationID: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    availability: [],
    bookedDates: [],
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
    start: String,
    end: String

})

export default db.model('Resource', resourceSchema)