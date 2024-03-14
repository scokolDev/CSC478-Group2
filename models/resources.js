import db from 'mongoose'

const resourceSchema = new db.Schema({
    name: String,
    image: String,
    availability: Date,
    services: String,
    recurrenc: String

})

export default db.model('Resource', resourceSchema)