import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import JobListingNew from './jobListings/JobListingNew'

class App extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            <div className="container" >
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/jobListings" component={Dashboard} />
                        <Route path="/jobListings/new" component={JobListingNew} />

                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)