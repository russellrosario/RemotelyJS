import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
  render() {

    return (
      <StripeCheckout
        name="RemotelyJS"
        description="$100 for a job listing on RemotelyJS"
        amount={10000}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add credits
      </button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments)