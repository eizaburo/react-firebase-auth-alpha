import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';

const store = createStore(combineReducers({
    user: userReducer,
}), applyMiddleware());

ReactDOM.render
    (
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root')
    );
