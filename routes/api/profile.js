const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Load Profile Model
const Profile = require('../../models/Profile')
// Load User Model
const User = require('../../models/User')

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {}
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.github) profileFields.social.github = req.body.github

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile))
      } else {
        new Profile(profileFields).save().then(profile => res.json(profile))
      }
    })
  })

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to exp array
      profile.experience.unshift(newExp)

      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to exp array
      profile.education.unshift(newEdu)

      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route   POST api/profile/job/star
// @desc    adds job to starred jobs
// @access  Private
router.post(
  '/job/star',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.jobId)
    Profile.findOne({ user: req.user.id }).then(profile => {
      
      const jobIndex = profile.starredJobs.indexOf(req.body.jobId);
      // Add to id if it does not exist array
      if(jobIndex < 0){
        profile.starredJobs.push(req.body.jobId);
      }
      

      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route   POST api/profile/job/unstar
// @desc    removes job from starred jobs
// @access  Private
router.post(
  '/job/unstar',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.jobId)
    Profile.findOne({ user: req.user.id }).then(profile => {
      
      const jobIndex = profile.starredJobs.indexOf(req.body.jobId);
      // Add to id if it does not exist array
      if(jobIndex > - 1){
        profile.starredJobs.splice(jobIndex, 1);
        
      }
      
      profile.save().then(profile => res.send('Removed'));
      
    })
  }
)

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id)

        // Splice out of array
        profile.experience.splice(removeIndex, 1)

        // Save
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id)

        // Splice out of array
        profile.education.splice(removeIndex, 1)

        // Save
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    })
  }
)

module.exports = router
