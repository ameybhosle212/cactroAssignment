const mongoose = require("mongoose")

const followingSchema = new mongoose.Schema({
    artist_ID: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }],
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = new mongoose.model('FollowingUserToArtist',followingSchema)