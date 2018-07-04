import React, { Component } from 'react';


import './style.css';

class Prev extends Component {
  

  render() {

    return (
      <a onClick={this.props.onClick}>&lt;Previous</a>
    );
  }
}

export default Prev;