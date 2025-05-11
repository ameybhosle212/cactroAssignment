const mongoose = require("mongoose")

const StateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nowPlaying: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    playingStatus: {
        type: String,
        default: 'Paused'
    }
  });

module.exports = new mongoose.model('State',StateSchema)