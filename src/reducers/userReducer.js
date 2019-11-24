const initialState = {
    name: "hoge",
    age: 33,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default user;