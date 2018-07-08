import React, { Component } from 'react';


import './style.css';

class Prev extends Component {
  

  render() {

    return (
      <a onClick={this.props.onClick} id="prev"><i className="far fa-arrow-alt-circle-left"></i></a>
    );
  }
}

export default Prev;