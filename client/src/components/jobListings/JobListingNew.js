// JobListingNew shows JobListingForm and JobListingFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import JobListingForm from './JobListingForm';
import JobListingFormReview from './JobListingFormReview';

class JobListingNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <JobListingFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <JobListingForm
        onJobListingSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'jobListingForm'
})(JobListingNew);