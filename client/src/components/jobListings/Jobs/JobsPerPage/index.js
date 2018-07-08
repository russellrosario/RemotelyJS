import React, { Component } from 'react';


import './style.css';

class JobsPerPage extends Component {

  constructor(props){
    super(props);

    this.onClick =  this.onClick.bind(this);
  }

  onClick = (event)=>{
    this.props.changeResultsPerPage(parseInt(event.target.getAttribute('value'), 10));
  }
  

  render() {

    return (
      <div id="results-per-page" className="text-center">
        <span>Jobs per page: </span>
       {/* <!-- Example single danger button --> */}
        <div className="btn-group">
          <button type="button" className="btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.props.resultsPerPage}
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={this.onClick} value="10">10</a>
            <a className="dropdown-item" onClick={this.onClick} value="20">20</a>
            <a className="dropdown-item" onClick={this.onClick} value="50">50</a>
          </div>
        </div>
      </div>
    );
  }
}

export default JobsPerPage;