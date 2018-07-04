const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput (data) {
  let errors = {}

  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.github)) {
    if (!Validator.isURL(data.github)) {
      errors.github = 'Not a valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
