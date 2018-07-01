import React, {Component} from 'react'

import Banner from './Banner';
import Menu from './Menu';

import './style.css';


class Landing extends Component {
  render(){
    return (
      <div id="bg-div">
          <Banner />
          <Menu />
      </div>
    )
  }
}

export default Landing;