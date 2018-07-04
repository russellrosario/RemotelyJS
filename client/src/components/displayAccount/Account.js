import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../../utils/Spinner';
import ProfileActions from './ProfileActions';
import Profile from './Profile';
import Experience from './Experience';
import Education from './Education';

class Account extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }


  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let displayContent;

    if (profile === null || loading) {
      displayContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        displayContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <ProfileActions />
            <Profile
              company={profile.company}
              website={profile.website}
              location={profile.location}
              status={profile.status}
              skills={profile.skills}
              bio={profile.bio}
              linkedin={profile.linkedin}
              github={profile.github}
              twitter={profile.twitter}
              facebook={profile.facebook}
            />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );

      } else {
        // User is logged in but has no profile
        displayContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}, you have not yet setup a profile.</p>
            <Link to="/create-profile" className="btn btn-lg btn-success">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="account">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Your Profile</h1>
              {displayContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Account
);
