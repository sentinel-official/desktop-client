import { LoginActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    loggedInUserDetails: null,
    isLoggedIn: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LoginActionTypes.post_Login.REQUEST:
            return {
                ...state,
                loading: true,
                isLoggedIn: false
            };
        case LoginActionTypes.post_Login.SUCCESS:
            return {
                ...state,
                loading: false,
                loggedInUserDetails: payload,
                isLoggedIn: true
            };
        case LoginActionTypes.post_Login.FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false
            };
        default:
            return state;
    }
};
