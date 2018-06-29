const mongoose = require('mongoose');
const axios = require('axios');
const cheerio =  require('cheerio');

const Jobs = mongoose.model('jobs');

const scraper = require('../controllers/jobBoard');

module.exports = app => {
  
    app.get('/api/jobs/list', async (req, res) => {
        const results = await Jobs.find();
        res.json(results);
    });


}
