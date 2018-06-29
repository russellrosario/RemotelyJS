const mongoose = require('mongoose');
const axios = require('axios');
const cheerio =  require('cheerio');

const Jobs = mongoose.model('jobs');

const scrapeOptions = {
    //this is the url for the search we perform on indeed
    url: "https://www.indeed.com",
    //this is the job search we are running, in this case:
    //remote+javascript in the last 24h
    search: '/jobs?as_and=remote+javascript&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l=&fromage=1&limit=10&sort=&psf=advsrch'
};

//find out how many results there are
const countResults = ($)=>{
    const fullCountSection = $('#searchCount').text();
    const numberResults = fullCountSection.match(/of (.*?) jobs/)[1].replace(/,/, "")
    //gets the total results only
    return numberResults;
}

//scrape each page for jobs
const pageScrape = (url)=>{
    return axios
            .get(url)
            .then(result=>{
                // console.log(result);
            })
            .catch(e=>{
                if(e) console.log(`Error on ${url}`);
            });
}

function Job (title, company, desc, sal, link){
    this.jobTitle = title;
    this.company = company;
    this.description = desc;
    this.salary = sal;
    this.link = link;
    this.dateAdded = new Date;
}

//finds all job listings on the  passed in page and saves them to mongo
const findJobs = ($, e)=>{
    const found = [];

    var jobs = $('#resultsCol .jobtitle').parent('.row');

    jobs.each((i,e)=>{

        const title = $(e).find('.jobtitle').text().trim();
        const company = $(e).find('.company, .company .turnstileLink').text().trim().replace(/\n.*/, '');
        const desc = $(e).find('.summary').text().trim();
        const sal = $(e).find('div > span.no-wrap').text().trim();
        const link = scrapeOptions.url.concat($(e).find('a[data-tn-element=jobTitle]').attr('href'));
        const dateAdded = new Date;
        //construct an object ready to be passed to MongoDB

        found.push(new Job(title, company, desc, sal, link));
    });

    found.forEach(async (e, i)=>{
        console.log(i);
        const { jobTitle, company, description, salary, link, dateAdded } = e;

        const job = new Jobs({
        jobTitle,
        company,
        description,
        salary,
        link,
        dateAdded
        });

        await job.save();
    });
    

}



//run scrape
const scrape = ()=>{
    //hardcoded rpp
    let resultsPerPage = 16;

    

    //this will scrape results for the last 24 hrs
    axios
        .get(scrapeOptions.url + scrapeOptions.search)
        .then(response => {
            //cheerio parsed data that will be passed in to all the processing functions
            const $ = cheerio.load(response.data);

            let promises = [];

            const totalResults = countResults($);
            console.log(`Found ${totalResults} jobs on indeed.com`);
            
            const pages = Math.ceil(totalResults/resultsPerPage);
            console.log(`Scraping ${pages} pages.`);

            //scrape each page
            for (i = 0; i < pages; i++){
                promises.push(pageScrape(scrapeOptions.url.concat(scrapeOptions.search, `&start=${i*16}`)));

            }

            let jobResults = [];
            //once all the body htmls are in, find the actual jobs on each page
            Promise
                .all(promises)
                .then(() => {
                    
                    promises.map((e,i)=> findJobs($, e));
                })
                .then(()=> {return true;})
                .catch(e=> {if(e) console.log(e)});

        })
}


//setInterval 24hrs @reScrape();

module.exports = {
    scrape: scrape
}