import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class One extends Component {
  render() {
    return (
      <div>
        <p className="lead text-center">
          Finding remote work for software developers
        </p>
        <Link to="/account" className="btn btn-light">
          Go Back
              </Link>
      </div>
    )
  }
}
