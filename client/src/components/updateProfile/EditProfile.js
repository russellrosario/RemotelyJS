import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../formHelpers/TextFieldGroup';
import TextAreaFieldGroup from '../formHelpers/TextAreaFieldGroup';
import InputGroup from '../formHelpers/InputGroup';
import SelectListGroup from '../formHelpers/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../utils/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      github: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      let skillsCSV

      if (profile.skills) {
        skillsCSV = profile.skills.join(',');
      }

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.github = !isEmpty(profile.social.github)
        ? profile.social.github
        : '';

      // Set component fields state
      this.setState({
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        github: profile.github
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      github: this.state.github
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/account" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder="City, State (New York, NY)"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextAreaFieldGroup
                  placeholder="* Skills - Please use comma separated values (JavaScript, Node, React)"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <TextAreaFieldGroup
                  placeholder="Bio - Tell us a little about yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />

                <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fab fa-linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                />

                <InputGroup
                  placeholder="Github Profile URL"
                  name="github"
                  icon="fab fa-github"
                  value={this.state.github}
                  onChange={this.onChange}
                  error={errors.github}
                />

                <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
                />

                <InputGroup
                  placeholder="Facebook Profile URL"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
                />


                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
