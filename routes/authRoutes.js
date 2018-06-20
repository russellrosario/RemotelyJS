const passport = require('passport')

const env = {
  AUTH0_CLIENT_ID: 'cftd3aHlDCTSoMwbFzFP3krbK6ZLL35h',
  AUTH0_DOMAIN: 'remotelyjs.auth0.com',
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
}

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/jobListings')
    })

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })

  // Perform the login
  app.get(
    '/login',
    passport.authenticate('auth0', {
      clientID: env.AUTH0_CLIENT_ID,
      domain: env.AUTH0_DOMAIN,
      redirectUri: env.AUTH0_CALLBACK_URL,
      audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
      responseType: 'code',
      scope: 'openid'
    }),
    function (req, res) {
      res.redirect('/')
    }
  )

  // Perform session logout and redirect to homepage
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  // Perform the final stage of authentication and redirect to '/user'
  app.get(
    '/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    function (req, res) {
      res.redirect(req.session.returnTo || '/user')
    }
  )
}
