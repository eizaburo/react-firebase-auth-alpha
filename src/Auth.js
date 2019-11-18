import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

class Auth extends React.Component {

    state = {
        signedIn: false,
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ signedIn: true })
            }
        });
    }

    render() {
        if (this.state.signedIn) {
            return this.props.children;
        } else {
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;