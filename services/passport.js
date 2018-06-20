const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Auth0Strategy = require('passport-auth0')
const keys = require('../config/keys')

const mongoose = require('mongoose')
const User = mongoose.model('users')

// serialize cookie before sending in header
// null is error object

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// // deserialize cookie to authenticate user
// // null is error object
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => {
//       done(null, user)
//     })
// })

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

const strategy = new Auth0Strategy(
  {
    domain: 'remotelyjs.auth0.com',
    clientID: 'cftd3aHlDCTSoMwbFzFP3krbK6ZLL35h',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile)
  }
)

passport.use(strategy)

// This can be used to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
