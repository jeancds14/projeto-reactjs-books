import React from 'react';

import { Switch } from 'react-router-dom';

import Login from '../page/Login';
import Register from '../page/Register';
import Home from '../page/Home';
import AddBook from '../page/AddBook';

import Route from './Route';

const Routers = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" isPrivate={true} component={Home} />
            <Route path="/addbook" isPrivate={true} component={AddBook} />
        </Switch>
    );
}

export default Routers;