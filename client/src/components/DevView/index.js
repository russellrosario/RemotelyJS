import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';

import './style.css';

class DevView extends Component {

  componentWillMount() {
    this.props.fetchJobs();
  }

  render() {
    const renderJobs = this.props.jobs.map((job,i) => {
      return (
        <a className='jobLink' href={job.link} key={i} target="_blank">
          <div className='jobBox'>
            <p className='jobTitle'>{job.jobTitle}</p>
            <p className='jobCompany'>{job.company}</p>
            <p className='jobSalary'>{job.salary}</p>
            <p className='jobDescription'>{job.description}</p>
          </div>
        </a>
      )
    })

    return (
      <div>
        {renderJobs}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //state.jobs or empty array if undefine to avoid issues
  jobs: state.jobs || []
})
  
export default connect(mapStateToProps, { fetchJobs })(DevView);