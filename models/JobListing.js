const mongoose = require('mongoose')
const { Schema } = mongoose

const jobListingSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  email: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('jobListings', jobListingSchema)
