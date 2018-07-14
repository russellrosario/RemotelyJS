import React, { Component } from 'react';


import './style.css';
import { isContext } from 'vm';

class Star extends Component {
  constructor(props){
    super(props);

    this.state = {
      starred: this.props.isStarred
    }
  }

  render() {
    const isStarred = ()=>{
      return this.props.isStarred === true ? ' starred' : ''
    }
    const icon = ()=>{
      return this.props.isStarred === true ? 'favorite' : 'favorite_border';
    }
    return (
      <span className={isStarred()}><i className="material-icons star" data-job-id={this.props.jobId} onClick={this.props.handleStar}>
      {icon()}
      </i></span>
    );
  }
}

export default Star;