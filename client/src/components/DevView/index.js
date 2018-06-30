import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';
import { jobCount } from '../../actions';

import TotalPages from './TotalPages';
import CurrentPage from './CurrentPage';
import Next from './Next';
import Prev from './Prev';

import './style.css';


class DevView extends Component {

  constructor(props){
    super(props);

    this.state = {page: 1, resultsPerPg: 20};

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage = ()=>{

    if((this.state.page * this.state.resultsPerPg) + this.state.resultsPerPg < (this.props.count + 1) || this.props.count > (this.state.page * this.state.resultsPerPg)) {
      this.setState({page: (this.state.page + 1)});
      this.props.fetchJobs((this.state.page + 1), this.state.resultsPerPg);
    }
  }

  prevPage = ()=>{

    if(this.state.page > 1) {
      this.setState({page: (this.state.page - 1)});
      this.props.fetchJobs((this.state.page -1), this.state.resultsPerPg);
    }
  }

  componentWillMount() {
    this.props.fetchJobs(this.state.page, this.state.resultsPerPg);
    this.props.jobCount();
  }

  render() {


    const renderJobs = this.props.jobs.map((job,i) => {
      return (
        <a className='jobLink' href={job.link} key={i} target="_blank">
          <div className='jobBox'>
            <p className='jobTitle'>{`${job.jobTitle}`}</p>
            <p className='jobCompany'>{job.company}</p>
            <p className='jobSalary'>{job.salary}</p>
            <p className='jobDescription'>{job.description}</p>
          </div>
        </a>
      )
    })

    return (
      <div>
        <p>Results</p>
        <Prev onClick={this.prevPage} />
        <Next onClick={this.nextPage} />
        <p>Now showing: <CurrentPage page={this.state.page} shown={this.state.resultsPerPg} count={this.props.count} /><TotalPages count={this.props.count} shown={this.state.resultsPerPg} /> jobs.</p>
        <div></div>
        {renderJobs}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //state.jobs or empty array if undefine to avoid issues
  jobs: state.jobs || [],
  count: state.count 
})
  
export default connect(mapStateToProps, { fetchJobs, jobCount })(DevView);