const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInquiryInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.message = !isEmpty(data.message) ? data.message : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = 'Message field is required'
  }

  if (!Validator.isLength(data.message, { min: 10 })) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
