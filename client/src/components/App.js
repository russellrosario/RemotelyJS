import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing/'
import Dashboard from './Dashboard'
import JobListingNew from './jobListings/JobListingNew'
import DevView from './DevView';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            
                <BrowserRouter>
                    <div>
                        
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/jobs" component={DevView} />
                        <Route exact path="/jobListings" component={Dashboard} />
                        <Route path="/jobListings/new" component={JobListingNew} />

                    </div>
                </BrowserRouter>
        
        )
    }
}

export default connect(null, actions)(App)