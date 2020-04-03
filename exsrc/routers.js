/**
 * Created by clakeboy on 2017/12/3.
 */
import React from 'react';
import {
    Route,
    Switch,
    HashRouter as Router
} from 'react-router-dom';

import App from './components/App';
import Doc from './doc/Main';

const routes = (
    <Router>
        <Switch>
            <Route path='/doc/:path*' component={Doc}/>
            <Route component={App}/>
        </Switch>
    </Router>
);

export default routes;