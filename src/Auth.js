import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';

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
        if(!this.state.signInCheck){
            return <p>ログインチェック中...</p>
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