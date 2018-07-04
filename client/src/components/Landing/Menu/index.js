import React, {Component} from 'react'

import Tile from './Tile';

import './style.css';

class Menu extends Component {
    render(){
        return (
            
                <div className="row" id="menu-wrap">
                    <Tile name="Browse" desc="Find Remote JavaScript jobs" icon="i" />
                    <Tile name="Browse" desc="Find Remote JavaScript jobs" icon="i" />
                    <Tile name="My Postings" desc="View and manage your job postings" icon="i" />
                </div>
            
        )
    }
}

export default Menu;