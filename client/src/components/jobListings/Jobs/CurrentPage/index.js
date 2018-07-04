import React, { Component } from 'react';


import './style.css';

class CurrentPage extends Component {

  

  render() {

    const start = (this.props.page * this.props.shown) - this.props.shown + 1;
    const end = (this.props.page * this.props.shown) < this.props.count ? (this.props.page * this.props.shown) : this.props.count;

    return (
      <span>
        {this.props.page > 0 ? `${start}-${end} of ` : ''}
      </span>
    );
  }
}

export default CurrentPage;