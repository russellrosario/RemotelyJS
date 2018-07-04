import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitInquiry } from '../../actions/inquiryActions';
import TextFieldGroup from '../formHelpers/TextFieldGroup';
import TextAreaFieldGroup from '../formHelpers/TextAreaFieldGroup';


class Hiring extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newInquiry = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };

    this.props.submitInquiry(newInquiry, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Need JS developers?</h1>
              <p className="lead text-center">
                We can help! Tell us what you need.
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextAreaFieldGroup
                  placeholder="Message"
                  name="message"
                  type="text"
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                />
                <input type="submit" className="btn btn-success btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hiring.propTypes = {
  submitInquiry: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { submitInquiry })(withRouter(Hiring));
