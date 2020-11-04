import React from 'react';

import {
    Route as ReactDOMRoute,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
  
const Route = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { token } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!token ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/',
                            state: { from: location }
                        }}
                    />
                );
            }
        }
        />
    );
};

export default Route;