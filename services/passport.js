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
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser)
      } else {
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user))
      }
    })
}))
