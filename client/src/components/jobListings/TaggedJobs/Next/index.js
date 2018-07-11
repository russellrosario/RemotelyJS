import React, { Component } from 'react';


import './style.css';

class Next extends Component {

  render() {
    return (
      <a onClick={this.props.onClick} id="next"><i className="far fa-arrow-alt-circle-right"></i></a>
    );
  }
}

export default Next;