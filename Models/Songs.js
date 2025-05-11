const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    song_name:{
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
})

module.exports = new mongoose.model('Song', songSchema)