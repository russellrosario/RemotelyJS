const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../../models/jobs');

const mongoose = require('mongoose');

const Jobs = mongoose.model('jobs');
// Load User model
const User = require('../../models/User');

const scraper = require('../../controllers/jobBoard');


    router.get('/count', async (req, res) => {
        console.log(req.params)
        //gets count
        const results = await Jobs.countDocuments();
        res.status(200).send(results.toString());
    });
  
    router.get('/list', async (req, res) => {
        console.log(req.query);
        //sorted last scraped shown first
        const results = await Jobs.find().sort({'dateAdded': -1}).limit(parseInt(req.query.show)).skip(parseInt(req.query.page) * parseInt(req.query.show));
        res.send(results);
    });

    router.get('/match/:tag', async (req,res)=>{
        const numResults = await Jobs.countDocuments({ 
            $or :[
                //if the jobTitle *or* description contains tag
                //sorted last scraped shown first
                {'jobTitle': { $regex: new RegExp(req.params.tag, 'gi')}},
                {'description': { $regex: new RegExp(req.params.tag, 'gi')}}
             ]});

        const results = await Jobs.find({ 
            $or :[
                //if the jobTitle *or* description contains tag
                //sorted last scraped shown first
                {'jobTitle': { $regex: new RegExp(req.params.tag, 'gi')}},
                {'description': { $regex: new RegExp(req.params.tag, 'gi')}}
             ]}).sort({'dateAdded': -1}).limit(parseInt(req.query.show)).skip(parseInt(req.query.page) * parseInt(req.query.show));

        res.send([numResults, results]);
    });

    //scrapes last 24 hrs. ran 7/12 8pm
    router.get('/scrape', async (req, res) => {
        console.log('scraping')
        await scraper.scrape();
        res.redirect('/feed');
    });

    // @route   POST api/jobs/job/star
// @desc    adds job to starred jobs
// @access  Private
router.post(
    '/job/star',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.body.jobId)
      User.findOne({ _id: req.user.id }).then(user => {
        
        const jobIndex = user.starredJobs.indexOf(req.body.jobId);
        // Add to id if it does not exist array
        if(jobIndex < 0){
          user.starredJobs.push(req.body.jobId);
        }
        
  
        user.save().then(user => res.json(user.starredJobs))
      })
    }
  )
  
  // @route   POST api/jobs/job/unstar
  // @desc    removes job from starred jobs
  // @access  Private
  router.post(
    '/job/unstar',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.body.jobId)
      User.findOne({ _id: req.user.id }).then(user => {
        
        const jobIndex = user.starredJobs.indexOf(req.body.jobId);
        // Add to id if it does not exist array
        if(jobIndex > - 1){
          user.starredJobs.splice(jobIndex, 1);
          
        }
        
        user.save().then(user => res.send('Removed'));
        
      })
    }
  )
  
  // @route   GET api/jobs/starred
  // @desc    Return current user
  // @access  Private
  router.get(
    '/starred',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      
      User.findOne({_id: req.user.id}).then(user=>{
        res.json(user.starredJobs)
      })
  
    }
  )

module.exports = router;
