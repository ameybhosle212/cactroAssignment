const express = require('express')
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const mongoose = require("mongoose")
const User = require('./Models/Users')
const LastPlayed = require('./Models/LastPlayed')
const FollowingUserToArtist = require('./Models/FollowingUserToArtist')
const Artist = require('./Models/Artist')
const Songs = require('./Models/Songs')
const MONGO_URI = 'mongodb+srv://admin:admin123@serverlessinstance0.fmyjk3d.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0';
app.use(express.json())
app.use(cors())
app.use(helmet())

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post("/", async (req, res) => {
  const user_id = req.body.userId;
  let output = {};
  if (user_id && user_id.length > 0) {
    const getUserDetaild = await User.findById(user_id).populate('followingArtist');
    console.log(getUserDetaild)
    if (getUserDetaild) {
      const lastPlayingSong = await LastPlayed.findOne({ user: user_id }).populate('nowPlaying');
      if (lastPlayingSong) {
        output['lastSong'] = lastPlayingSong
      } else {
        output['lastSong'] = {}
      }
      const artistFollowed = await FollowingUserToArtist.findOne({ user: user_id }).populate('artist_ID')
      console.log(artistFollowed)
      const filteredFollowing = artistFollowed && artistFollowed['artist_ID'] && artistFollowed['artist_ID'].map(value => {
        return {
          artist_name: value.artist_name,
          image: value.image
        }
      })
      const allSongs = await Songs.find().populate('artist').limit(10);
      output['songs'] = allSongs || [];
      output['followingArtist'] = filteredFollowing || [];
      const followingArtist = await FollowingUserToArtist.findOne({ user: user_id }).populate('artist_ID');
      if (followingArtist) {
        output['followingUsers'] = followingArtist[0]
      }
      return res.json({
        'error': null,
        'status': 'ok',
        'data': output
      })
    } else {
      return res.json({
        'error': 'No Such User',
        'status': 'error',
        'msg': 'No Such User'
      })
    }
  } else {
    return res.json({
      'error': 'No User ID Provided',
      'status': 'error',
      'msg': 'No User ID Provided'
    })
  }
})

app.listen(1200, () => {
  console.log("server at 1200")
})