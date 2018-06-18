// JobListingForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import JobListingField from './JobListingField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class JobListingForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={JobListingField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onJobListingSubmit)}>
          {this.renderFields()}
          <Link to="/jobListings" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmail(values.email || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'jobListingForm',
  destroyOnUnmount: false
})(JobListingForm);