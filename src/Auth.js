import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

class Auth extends React.Component {
    render() {
        if (this.props.user) {
            return this.props.children;
        } else {
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;