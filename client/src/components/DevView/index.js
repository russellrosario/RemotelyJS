import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobListings } from '../../actions';

import axios from 'axios';

class DevView extends Component {

  constructor(props){
      super(props);

      this.state = {
          jobs: []
      }
  }

  componentWillMount() {
    axios
      .get('/api/jobs')
      .then(data => this.setState({jobs: data}))
  }

  render() {
      const jobs = this.state.props;
    return (
      <div>
        Reg View;
        
      </div>
    );
  }
}

function mapStateToProps({ jobListings }) {
    return { jobListings };
}
  
export default connect(mapStateToProps, { fetchJobListings })(DevView);