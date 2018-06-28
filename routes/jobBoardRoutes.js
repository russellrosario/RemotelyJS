const mongoose = require('mongoose');
const axios = require('axios');
const cheerio =  require('cheerio');

const Jobs = mongoose.model('jobs');

const scrapeOptions = {
    //this is the url for the search we perform on indeed
    url: "https://www.indeed.com",
    //this is the job search we are running
    search: '/jobs?q=remote+javascript'
};

//find out how many results there are
var countResults = ($)=>{
    var promises = [];

    var fullCountSection = $('#searchCount').text();
    var numberResults = fullCountSection.match(/of (.*?) jobs/)[1].replace(/,/, "")
    //gets the total results only
    console.log(`Found: ${numberResults} jobs!`);
    return Math.ceil(parseInt(numberResults)/16);
}

//run scrape
const scrape = ()=>{
    //this will scrape results for the last 24 hrs
    axios
        .get(scrapeOptions.url + scrapeOptions.search)
        .then(response => {
            const $ = cheerio.load(response.data);
            //call count results on cheerio parsed data
            const pages = countResults($);
            console.log(pages);
        })
}


//setTimeout 24hrs @reScrape();





//determine pages to scrape

//scrape each page for jobs

//save each result to mongoDB


module.exports = app => {
  
    app.get('/api/jobs/list', async (req, res) => {
        const results = await Jobs.find();
        res.json(results);
    });

    app.get('/api/jobs/scrape', (req, res) => {
        scrape();
    });

}
