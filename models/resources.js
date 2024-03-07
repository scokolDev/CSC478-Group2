const db = require('mongoose')

const resourceSchema = new db.Schema({
    name: String,
    image: String,
    availability: Date,
    services: String,
    recurrenc: String

})

module.exports = db.model('Resource', resourceSchema)