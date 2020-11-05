import React from 'react';

import { Switch } from 'react-router-dom';

import Login from '../page/Login';
import Home from '../page/Home';

import Route from './Route';

const Routers = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" isPrivate={true} component={Home} />
        </Switch>
    );
}

export default Routers;