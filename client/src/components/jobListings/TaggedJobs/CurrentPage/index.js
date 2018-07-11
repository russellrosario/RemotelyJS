import React, { Component } from 'react';


import './style.css';

class CurrentPage extends Component {

  

  render() {

    const start = (this.props.page * this.props.shown) + 1;
    //const end = this.props.page > 0 ? (this.props.page + 1) * this.props.shown : this.props.shown ;
    const end = (this.props.page + 1 === (Math.ceil(this.props.count / this.props.shown))) ? this.props.count : (this.props.page + 1)*this.props.shown ;

    return (
      <span>
        {this.props.page > -1 ? `${start}-${end} of ` : ''}
      </span>
    );
  }
}

export default CurrentPage;