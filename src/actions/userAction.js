import firebase, { db } from '../Firebase';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email,
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password,
    }
}

export const signIn = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user;
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(getUser(resonse.user.uid));
        } catch (e) {
            alert(e);
        }
    }
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db.collection('users').doc(uid).get();
            dispatch({
                type: SIGNIN,
                payload: user.data(),
            });
        } catch (e) {
            alert(e);
        }
    }
}

export const signUp = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password, tel } = getState().user;
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (response.user.uid) {

                const user = {
                    uid: response.user.uid,
                    email: email,
                    tel: tel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }

                db.collection('users').doc(response.user.uid).set(user);

                dispatch({
                    type: SIGNUP,
                    payload: user,
                });
            }
        } catch (e) {
            alert(e);
        }
    }
}