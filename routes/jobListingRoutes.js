const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const JobListing = mongoose.model('jobListings')

module.exports = app => {
  app.get('/api/jobListings', requireLogin, async (req, res) => {
    const jobListings = await JobListing.find({ _user: req.user.id }).select({
      email: false
    })

    res.send(jobListings)
  })

  app.post('/api/jobListings', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, email } = req.body

    const jobListing = new JobListing({
      title,
      subject,
      body,
      email,
      _user: req.user.id,
      dateSent: Date.now()
    })

    try {
      await jobListing.save()
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
