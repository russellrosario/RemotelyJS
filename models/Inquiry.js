const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const InquirySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Inquiry = mongoose.model('inquiries', InquirySchema)

module.exports = Inquiry
