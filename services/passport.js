const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// mongoose models are not exported using CommonJS
const User = mongoose.model('users')

// serialize cookie before sending in header
// null is error object
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// deserialize cookie to authenticate user
// null is error object
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

// passport.authenticate('google')
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id })

  if (existingUser) {
    return done(null, existingUser)
  }

  const user = await new User({ googleId: profile.id }).save()
  done(null, user)
}))
