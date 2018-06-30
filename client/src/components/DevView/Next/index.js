import React, { Component } from 'react';


import './style.css';

class Next extends Component {
  

  render() {

    return (
      <a onClick={this.props.onClick}>Next&gt;</a>
    );
  }
}

export default Next;