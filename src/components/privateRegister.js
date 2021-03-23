import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import RegisterAdmin from './../components/firstRegister';

const PrivateRegister = ({ component: Component, countAdmin, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            countAdmin.size > 0
                ? <Component {...props} />
                : <RegisterAdmin />
        )}
    />
);

export default PrivateRegister

