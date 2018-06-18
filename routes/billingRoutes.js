const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 10000,
      currency: 'usd',
      description: '$100 for a job listing on RemotelyJS',
      source: req.body.id
    })

    console.log(charge)

    req.user.credits += 1
    const user = await req.user.save()

    res.send(user)
  })
}
