import React, { Component } from 'react';


import './style.css';

class TotalPages extends Component {

  

  render() {

    return (
      <span>
        {this.props.count > 0 ? (this.props.count) : 'Loading...'}
      </span>
    );
  }
}

export default TotalPages;