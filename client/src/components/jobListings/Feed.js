import React, { Component } from 'react'
import Jobs from './Jobs'
import TaggedJobs from './TaggedJobs';

const filters = ['all', 'react', 'angular', 'vue', 'node']

class Feed extends Component {
  constructor(props){
    super(props);

    this.state = {
      filter: 'all'
    }

    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter = (event)=>{
    const filter = event.target.getAttribute('value');
    if(filters.some(e => e === filter) && filter !== this.state.filter){
      this.setState({filter: filter});
    }
  }

  render() {
    const jobs = ()=>{
      if(this.state.filter !== 'all'){
        return <TaggedJobs filter={this.state.filter} />;
      }
      
      return <Jobs />;
    }

    const tagSelectors = ()=>{
        return filters.map((e,i) => <a value={e} className={this.state.filter === e ? "filter-container active" : "filter-container"} onClick={this.changeFilter} key={i}>{e}</a>);

    }

    return(
      <div>
          <p className="text-center">Filter: </p>
          <div className="d-flex flex-row justify-content-center">{tagSelectors()}</div>
          <br />
          {jobs()}
      </div>
    )
  }
}

export default Feed
