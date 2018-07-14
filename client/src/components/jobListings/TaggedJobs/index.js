import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTaggedJobs } from '../../../actions/jobBoardActions';

import moment from 'moment';

import TotalPages from './TotalPages';
import CurrentPage from './CurrentPage';
import Next from './Next';
import Prev from './Prev';
import JobsPerPage from './JobsPerPage';

import './style.css';
import Star from '../Star';



class TaggedJobs extends Component {

  constructor(props){
    super(props);


    this.state = {page: 0, resultsPerPg: 20};

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.changeResultsPerPage = this.changeResultsPerPage.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.isStarred = this.isStarred.bind(this);
  }

  nextPage = ()=>{

    //if next page last possible res > count
    if((this.state.page + 1) * this.state.resultsPerPg < this.props.taggedJobs[0] + 1 ) {
      this.setState({page: (this.state.page + 1)});
      this.props.fetchTaggedJobs(this.props.filter, (this.state.page + 1), this.state.resultsPerPg);
      
    }
  }

  prevPage = ()=>{

    if(this.state.page > 0) {
      
      this.setState({page: (this.state.page - 1)});
      this.props.fetchTaggedJobs(this.props.filter, (this.state.page - 1), this.state.resultsPerPg)
      
    }
  }

  changeResultsPerPage = (numResults)=>{
    this.setState({page: 0, resultsPerPg: numResults});
    this.props.fetchTaggedJobs(this.props.filter, 0, numResults);

  }

  componentDidMount() {
    console.log(this.props.filter)
    this.props.fetchTaggedJobs(this.props.filter, this.state.page, this.state.resultsPerPg);
  }

  handleStar = ()=>{
    console.log('starred')
  }

  isStarred = ()=>{
    console.log('t/f')
  }



  render() {

    console.log(this.props)

    const renderJobs = this.props.taggedJobs[1].map((job,i) => {
      return (
        <div key={i} className="col-sm-12 col-md-6">
          <Star jobId={job._id} handleStar={this.handleStar} isStarred={this.isStarred} />
          <a className='jobLink' href={job.link} target="_blank">
            
            <div className='jobBox'>
              <p>{job._id}</p>
              <h3 className='jobTitle'>{`${job.jobTitle}`}</h3>
              <p className='jobCompany'>{job.company}</p>
              <p className='jobSalary'>{job.salary}</p>
              <p className='jobDescription'>{job.description}</p>
              <p className="dateAdded">Added: {moment(job.dateAdded).format('MMM Do YYYY')}</p>
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
        <p className="text-center">Now showing: <CurrentPage page={this.state.page} shown={this.state.resultsPerPg} count={this.props.taggedJobs[0]} /><TotalPages count={this.props.taggedJobs[0]} shown={this.state.resultsPerPg} /> jobs.</p>
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
  //state.taggedJobs or 0, empty array if undefine to avoid issues
  taggedJobs: state.taggedJobs || [0, []]
})
  
export default connect(mapStateToProps, { fetchTaggedJobs })(TaggedJobs);