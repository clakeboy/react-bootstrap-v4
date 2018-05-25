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

const routes = (
    <Router>
        <Switch>
            <Route component={App}/>
        </Switch>
    </Router>
);

export default routes;