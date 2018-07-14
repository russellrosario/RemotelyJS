import React, { Component } from 'react';


import './style.css';

class Star extends Component {
  constructor(props){
    super(props);

    this.state = {
      starred: this.props.isStarred
    }
  }

  render() {
    return (
      <span><i className="material-icons star" data-job-id={this.props.jobId} onClick={this.props.handleStar}>
      favorite_border
      </i></span>
    );
  }
}

export default Star;