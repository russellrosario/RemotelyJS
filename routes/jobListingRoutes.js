const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const jobListingTemplate = require('../services/emailTemplates/jobListingTemplate')

const JobListing = mongoose.model('jobListings')

module.exports = app => {
  app.get('api/jobListings/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.get('/api/jobListings', requireLogin, async (req, res) => {
    const jobListings = await JobListing.find({ _user: req.user.id }).select({
      recipients: false
    })

    res.send(jobListings)
  })

  app.get('/api/jobListings/:jobListingId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/jobListings/webhooks', (req, res) => {
    const p = new Path('/api/jobListings/:jobListingId/:choice')

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, jobListingId: match.jobListingId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'jobListingId')
      .each(({ jobListingId, email, choice }) => {
        JobListing.updateOne(
          {
            _id: jobListingId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })

  app.post('/api/jobListings', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body

    const jobListing = new JobListing({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })

    // Great place to send an email!
    const mailer = new Mailer(jobListing, jobListingTemplate(jobListing))

    try {
      await mailer.send()
      await jobListing.save()
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
