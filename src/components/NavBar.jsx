import React from 'react';

import { Link } from 'react-router';

export default class NavBar extends React.Component {


    render() {
        return (
            <nav>
                <ul>
                <li><img alt="FaF" src="/images/faf_32x32.png" /></li>
                <li><Link to="/" activeStyle={{ color: 'red' }}>Home</Link></li>
                <li><Link to="/test" activeStyle={{ color: 'red' }}>TestLink</Link></li>
                </ul>
            </nav>
        );
    }
}
