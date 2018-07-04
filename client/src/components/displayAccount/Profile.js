import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    let profile = []
    if (this.props.company) {
      profile.push(<li key="company"><strong>Company:</strong> {this.props.company}</li >)
    }
    if (this.props.website) {
      profile.push(<li key="website"><strong>Website:</strong> {this.props.website}</li>)
    }
    if (this.props.location) {
      profile.push(<li key="location"><strong>Location:</strong> {this.props.location}</li>)
    }
    if (this.props.status) {
      profile.push(<li key="status"><strong>Status:</strong> {this.props.status}</li>)
    }
    if (this.props.skills) {
      const skillsCSV = this.props.skills.join(',');
      profile.push(<li key="skills"><strong>Skills:</strong> {skillsCSV}</li>)
    }
    if (this.props.bio) {
      profile.push(<li key="bio"><strong>Bio:</strong> {this.props.bio}</li>)
    }
    if (this.props.linkedin) {
      profile.push(<li key="linkedin"><strong>LinkedIn:</strong> {this.props.linkedin}</li>)
    }
    if (this.props.github) {
      profile.push(<li key="github"><strong>Github:</strong> {this.props.github}</li>)
    }
    if (this.props.twitter) {
      profile.push(<li key="twitter"><strong>Twitter:</strong> {this.props.twitter}</li>)
    }
    if (this.props.facebook) {
      profile.push(<li key="facebook"><strong>Facebook:</strong> {this.props.facebook}</li>)
    }



    return (
      <div>
        <h4 className="mb-4">Profile</h4>

        <ul>
          {profile}
        </ul>
      </div>
    )
  }
}