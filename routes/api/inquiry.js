const express = require('express')
const router = express.Router()

// Load Input Validation
const validateInquiryInput = require('../../validation/inquiry')

// Load User model
const Inquiry = require('../../models/Inquiry')

router.post('/submit', (req, res) => {
  const { errors, isValid } = validateInquiryInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newInquiry = new Inquiry({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })

  newInquiry
    .save()
    .then(inquiry => res.json(inquiry))
    .catch(err => console.log(err))
})

module.exports = router
