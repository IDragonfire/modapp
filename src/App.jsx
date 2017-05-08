import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, browserHistory} from 'react-router';

import Home from './pages/Home.jsx';
import AvatarList from './pages/AvatarList.jsx';

import './main.scss';

// used for jquery Links
window.myHistory = browserHistory;

ReactDOM.render(
    <Router history={browserHistory }>
      <Route>
        <Route path="/" component={Home} />
        <Route path="/avatars" component={AvatarList} />
      </Route>
    </Router>,
    document.getElementById('app')
);
