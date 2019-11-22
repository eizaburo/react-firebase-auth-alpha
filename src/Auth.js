import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import LoadingOverlay from 'react-loading-overlay';

class Auth extends React.Component {

    state = {
        signinCheck: false,
        signedIn: false,
    }

    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: true,
                    });
                }
            } else {
                if (this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: false,
                    });
                }
            }
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {

        if (!this.state.signinCheck) {
            return (
                <LoadingOverlay
                    active={true}
                    spinner
                    text='Loading...'
                >
                    <div style={{ height: '100vh', width: '100vw' }}></div>
                </ LoadingOverlay>
            );
        }

        if (this.state.signedIn) {
            return this.props.children;
        } else {
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;