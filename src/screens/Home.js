import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

//redux
import { connect } from 'react-redux';

class Home extends React.Component {
    handleLogout = () => {
        firebase.auth().signOut();
    }

    render() {
        // console.log(this.props.user);
        return (
            <div className="container">
                <p>Home</p>
                <Link to="/profile">Profileへ</Link>
                <br />
                <p>{this.props.user.email}</p>
                <br />
                <Button onClick={this.handleLogout}>ログアウト</Button>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.user,
    }
);

const mapDispatchToProps = dispatch => (
    {

    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);