import React, {Component} from 'react'

import Tile from './Tile';

import './style.css';

class Menu extends Component {
    render(){
        return (
            <div id="menu-wrapper container">
                <div className="row">
                    <Tile name="Browse" desc="Find Remote JavaScript jobs" icon="i" />
                    <Tile name="My Postings" desc="View and manage your job postings" icon="i" />
                </div>
            </div>
        )
    }
}

export default Menu;