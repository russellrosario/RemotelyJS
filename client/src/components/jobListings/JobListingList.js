import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobListings } from '../../actions';

class JobListingList extends Component {
  componentDidMount() {
    this.props.fetchJobListings();
  }

  renderJobListings() {
    return this.props.jobListings.reverse().map(jobListing => {
      return (
        <div className="card darken-1" key={jobListing._id}>
          <div className="card-content">
            <span className="card-title">{jobListing.title}</span>
            <p>
              {jobListing.body}
            </p>
            <p className="right">
              Sent On: {new Date(jobListing.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {jobListing.yes}</a>
            <a>No: {jobListing.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderJobListings()}
      </div>
    );
  }
}

function mapStateToProps({ jobListings }) {
  return { jobListings };
}

export default connect(mapStateToProps, { fetchJobListings })(JobListingList);