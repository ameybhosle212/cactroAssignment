const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Artist', artistSchema)