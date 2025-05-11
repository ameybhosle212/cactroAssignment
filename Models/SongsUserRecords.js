const mongoose = require("mongoose")

const songUserPlayedSchema = new mongoose.Schema({
    song:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = new mongoose.model('Song', songUserPlayedSchema)