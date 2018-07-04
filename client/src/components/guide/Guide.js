import React, { Component } from 'react'
import Contents from './Contents'

export default class Guide extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Employment Guide</h1>
        <p className="lead text-center">
          Finding remote work for software developers
        </p>
        <Contents />
      </div>
    )
  }
}
