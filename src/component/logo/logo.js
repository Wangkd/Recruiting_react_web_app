import React, { Component } from 'react';

import logoImg from './job.png'
import './logo.css';

class Logo extends Component {
    state = {}
    render() {
        return (
            <div className="logo-contaniner">
                <img src={logoImg} alt="" />
            </div>
        );
    }
}

export default Logo;