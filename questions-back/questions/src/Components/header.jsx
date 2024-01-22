import React, { Component } from 'react';
import './header.css';

class header extends Component {
    render() {
        return (
            <div>
                <nav id="header-nav-bar" className="navbar ">
                    <img className="navbar-logo" alt="Logo" src='/logo.png' />
                    <h1 className="navbar-title" >Interview</h1>
                </nav>
            </div>
        );
    }
}

export default header;