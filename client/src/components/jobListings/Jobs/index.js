import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobs, jobCount, fetchStarred } from '../../../actions/jobBoardActions';

import moment from 'moment';
import axios from 'axios';

import TotalPages from './TotalPages';
import CurrentPage from './CurrentPage';
import Next from './Next';
import Prev from './Prev';
import JobsPerPage from './JobsPerPage';
import Star from '../Star';

import './style.css';



class Jobs extends Component {

  constructor(props){
    super(props);

    this.state = {page: 0, resultsPerPg: 20};

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.changeResultsPerPage = this.changeResultsPerPage.bind(this);

    this.isStarred = this.isStarred.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.addStar = this.addStar.bind(this);
    
  }

  nextPage = ()=>{

    //if next page last possible res > count
    if((this.state.page + 1) * this.state.resultsPerPg < this.props.count + 1 ) {
      this.setState({page: (this.state.page + 1)});
      this.props.fetchJobs((this.state.page + 1), this.state.resultsPerPg);
      
    }
  }

  prevPage = ()=>{

    if(this.state.page > 0) {
      this.setState({page: (this.state.page - 1)});
      this.props.fetchJobs((this.state.page - 1), this.state.resultsPerPg)
      
    }
  }

  changeResultsPerPage = (numResults)=>{
    this.setState({page: 0, resultsPerPg: numResults});
    this.props.fetchJobs(0, numResults);

  }

  componentDidMount() {
    this.props.fetchJobs(this.state.page, this.state.resultsPerPg);
    this.props.jobCount();
    this.props.fetchStarred();
    
    
  }

  addStar (jobId){
    const stars = parseInt(document.getElementById(`jobStars_${jobId}`).innerHTML, 0);
     document.getElementById(`jobStars_${jobId}`).innerHTML = stars+1;
    return axios.post('/api/jobs/job/star', {
      jobId: jobId
    })
    
  }

   unStar (jobId){
     const stars = parseInt(document.getElementById(`jobStars_${jobId}`).innerHTML, 0);
     document.getElementById(`jobStars_${jobId}`).innerHTML = stars-1;
    return  axios.post('/api/jobs/job/unstar', {
      jobId: jobId
    })
    
  }
  
  handleStar = (e)=>{
    
    const clicked = e.target.getAttribute('data-job-id');

    const starred = this.props.starred;

    if(starred){
      
      const jobIsStarred = starred.indexOf(clicked) > -1;
      
      jobIsStarred ? this.unStar(clicked) : this.addStar(clicked);
      
    }
    

  }

  componentWillReceiveProps(){
    this.props.fetchStarred();
    
  }

  isStarred = (jobId)=>{
    if(this.props.starred){
      return this.props.starred.indexOf(jobId) > -1;
    }
  }



  render() {

    const thisJobStars = (jobId, starred)=>{
      return <span id={`jobStars_${jobId}`}>{starred}</span>
    }

    const renderJobs = this.props.jobs.map((job,i) => {
      return (
        <div key={i} className="col-sm-12 col-md-6">
          <Star jobId={job._id} handleStar={this.handleStar} isStarred={this.isStarred(job._id)} />
          <a className='jobLink' href={job.link} target="_blank">
            
            <div className='jobBox'>
              <h3 className='jobTitle'>{`${job.jobTitle}`}</h3>
              <p className='jobCompany'>{job.company}</p>
              <p className='jobSalary'>{job.salary}</p>
              <p className='jobDescription'>{job.description}</p>
              <p className="dateAdded">Added: {moment(job.dateAdded).format('MMM Do YYYY')}</p><span className="liked">Liked {thisJobStars(job._id, job.starred)}{` time(s)`}</span>
            </div>
          </a>
        </div>
      )
    })

    return (
      <div>
        <Prev onClick={this.prevPage} />
        <Next onClick={this.nextPage} />
        <JobsPerPage resultsPerPage={this.state.resultsPerPg} changeResultsPerPage={this.changeResultsPerPage} />
        <p className="text-center">Now showing: <CurrentPage page={this.state.page} shown={this.state.resultsPerPg} count={this.props.count} /><TotalPages count={this.props.count} shown={this.state.resultsPerPg} /> jobs.</p>
        <div className="row">
          {renderJobs}
        </div>

        <Prev onClick={this.prevPage} />
        <Next onClick={this.nextPage} />
        
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //state.jobs or empty array if undefine to avoid issues
  jobs: state.jobs || [],
  count: state.count,
  starred: state.starred || []
})
  
export default connect(mapStateToProps, { fetchJobs, jobCount, fetchStarred })(Jobs);