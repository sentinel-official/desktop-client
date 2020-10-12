import { LOAD_APP } from '../actions/types';

const initState = {
    isLoading: true,
};

export default function (state = initState, action) {
    switch (action.type) {
        case LOAD_APP:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
