import { UPDATE_EMAIL, UPDATE_PASSWORD, SIGNIN, SIGNUP, UPDATE_TEL } from '../actions/userAction';
import lodash from 'lodash';

const initialState = {
    email: '',
    password: '',
    tel: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            let emailState = { ...state };
            emailState.email = action.payload;
            return emailState;
        case UPDATE_PASSWORD:
            let passwordState = { ...state };
            passwordState.password = action.payload;
            return passwordState;
        case UPDATE_TEL:
            let telState = { ...state };
            telState.tel = action.payload;
            return telState;
        case SIGNUP:
            let signupState = { ...state };
            lodash.merge(signupState, action.payload);
            return signupState;
        case SIGNIN:
            let signinState = { ...state };
            lodash.merge(signinState, action.payload);
            return signinState;
        default:
            return state;
    }
}

export default user;