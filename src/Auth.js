import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import LoadingOverlay from 'react-loading-overlay';

class Auth extends React.Component {

    state = {
        signInCheck: false,
        signedIn: false,
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ signedIn: true })
                this.setState({ signInCheck: true })
            } else {
                this.setState({ signedIn: false })
                this.setState({ signInCheck: true })
            }
        });
    }

    render() {

        //ログイン状態チェックが完了するまで待つ
        if (!this.state.signInCheck) {
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

        //ログイン状態により振り分け
        if (this.state.signedIn) {
            return this.props.children;
        } else {
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;