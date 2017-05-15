import React from 'react';
import Headroom from 'react-headroom';

import { Link } from 'react-router';

export default class NavBar extends React.Component {


    render() {
        return (
            <Headroom>
                <ul>
                <li><img alt="FaF" src="/images/faf_32x32.png" /></li>
                <li><Link to="/" activeClassName="active">Home</Link></li>
                <li><Link to="/avatars" activeClassName="active">Avatar List</Link></li>
                <li><Link to="/bans" activeClassName="active">Ban List</Link></li>
                <li><Link to="/players" activeClassName="active">Player List</Link></li>
                </ul>
            </Headroom>
        );
    }
}
