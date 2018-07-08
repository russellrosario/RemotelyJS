const express = require('express')
const router = express.Router()

require('../../models/jobs')

const mongoose = require('mongoose');

const Jobs = mongoose.model('jobs');

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
        const results = await Jobs.find({ 
            $or :[
                //if the jobTitle *or* description contains tag
                //sorted last scraped shown first
                {'jobTitle': { $regex: new RegExp(req.params.tag, 'gi')}},
                {'description': { $regex: new RegExp(req.params.tag, 'gi')}}
             ]}).sort({'dateAdded': 1}).limit(20);

        res.send(results);
    });

    //scrapes last 24 hrs. ran 6/29 7.16pm
    router.get('/scrape', async (req, res) => {
        console.log('scraping')
        await scraper.scrape();
        res.redirect('/feed');
    });

module.exports = router;
