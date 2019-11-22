import React from 'react';
import { Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

class SignInOrUp extends React.Component {

    state = {
        user: null,
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                this.props.history.push("/");
            })
            .catch(error => {
                alert(error);
            });
    }

    componentDidMount = () => {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this._isMounted) {
                    this.setState({ uid: user.uid });
                }
            }
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    <p style={{ textAlign: 'center' }}>サインイン</p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            password: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!(touched.email && errors.email)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!(touched.password && errors.password)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <div style={{ textAlign: 'center' }}>
                                        <button className="btn btn-primary" type="submit">ログイン</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/signup">新規登録はこちら。</Link>
                </div>
                <div>
                    {this.state.uid}
                </div>
            </div>
        );
    }
}

export default withRouter(SignInOrUp);