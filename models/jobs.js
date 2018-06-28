const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({

    jobTitle: String,
    company: String,
    description: String,
    salary: String,
    link: String,
    posted: String,
    dateAdded: Date

});

mongoose.model('jobs', jobSchema);
