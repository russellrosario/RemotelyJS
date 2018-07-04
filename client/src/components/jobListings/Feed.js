import React, { Component } from 'react'
import Jobs from './Jobs'

export default class Feed extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Job Listings</h1>
        <Jobs />

      </div>
    )
  }
}
