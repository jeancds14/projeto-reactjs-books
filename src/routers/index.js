import React from 'react';

import { Switch } from 'react-router-dom';

import Login from '../page/Login';

import Route from './Route';

const Routers = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
        </Switch>
    );
}

export default Routers;