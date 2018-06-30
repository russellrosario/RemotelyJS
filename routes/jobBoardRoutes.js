const mongoose = require('mongoose');
const axios = require('axios');
const cheerio =  require('cheerio');

const Jobs = mongoose.model('jobs');

const scraper = require('../controllers/jobBoard');

module.exports = app => {

    app.get('/api/jobs/count', async (req, res) => {
        console.log(req.params)
        //gets count
        const results = await Jobs.count();
        res.status(200).send(results.toString());
    });
  
    app.get('/api/jobs/list', async (req, res) => {
        console.log(req.query);
        //sorted last scraped shown first
        const results = await Jobs.find().sort({'dateAdded': -1}).limit(parseInt(req.query.show)).skip(parseInt(req.query.page) * parseInt(req.query.show));
        res.send(results);
    });

    app.get('/api/jobs/match/:tag', async (req,res)=>{
        const results = await Jobs.find({ 
            $or :[
                //if the jobTitle *or* description contains tag
                //sorted last scraped shown first
                {'jobTitle': { $regex: new RegExp(req.params.tag, 'gi')}},
                {'description': { $regex: new RegExp(req.params.tag, 'gi')}}
             ]}).sort({'dateAdded': -1}).limit(20);

        res.send(results);
    });

    //scrapes last 24 hrs. ran 6/29 7.16pm
    app.get('/api/jobs/scrape', async (req, res) => {
        await scraper.scrape();
        res.redirect('/api/jobs/list');
    });


}
