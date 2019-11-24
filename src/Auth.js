import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import LoadingOverlay from 'react-loading-overlay';

//redux
import { connect } from 'react-redux';
import { getUser, updateEmail } from './actions/userAction';

class Auth extends React.Component {

    state = {
        signinCheck: false, //ログインチェックが完了してるか
        signedIn: false, //ログインしてるか
    }

    _isMounted = false; //unmountを判断（エラー防止用）

    componentDidMount = () => {
        //mountされてる
        this._isMounted = true;

        //ログインしてるかどうかチェック
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //してる

                //ユーザー情報取得
                this.props.getUser(user.uid);

                //フラグ更新
                if (this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: true,
                    });
                }
                //Custom Claimの取得
                user.getIdTokenResult(true).then(idTokenResult => {
                    if (idTokenResult.claims.admin) {
                        console.log("admin");
                    } else {
                        console.log("user");
                    }
                });

            } else {
                //してない
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
        //チェックが終わってないなら（ローディング表示）
        if (!this.state.signinCheck || this.props.user.email === '') {
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

        //チェックが終わりかつ
        if (this.state.signedIn && this.props.user.email !== '') {
            //サインインしてるとき（そのまま表示）
            return this.props.children;
        } else {
            //してないとき（ログイン画面にリダイレクト）
            return <Redirect to="/signin" />
        }
    }
}

const mapStateToProps = state => (
    {
        user: state.user,
    }
);

const mapDispatchToProps = dispatch => (
    {
        getUser: uid => dispatch(getUser(uid)),
        updateEmail: email => dispatch(updateEmail(email)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);