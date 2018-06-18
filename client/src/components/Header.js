import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return [
          <li key="1"><a href="/jobListings/new">Post a job</a></li>,
          <li key="2"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="4"><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/jobListings' : '/'}
            className="left brand-logo">
            RemotelyJS
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>

    )
  }
}


function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)