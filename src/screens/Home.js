import React from 'react';
import firebase from '../Firebase';

class Home extends React.Component {

    handleLogout = () => {
        firebase.auth().signOut();
        // this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <p>Home</p>
                <button onClick={this.handleLogout}>ログアウト</button>
            </div>
        );
    }
}

export default Home;