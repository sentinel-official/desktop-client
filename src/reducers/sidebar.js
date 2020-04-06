import { combineReducers } from 'redux';
import { SIDE_BAR_CONTENT_SHOW, SIDEBAR_DRAWER_TOGGLE, SIDEBAR_SELECTED_TAB_SET } from '../constants/sidebar';

const drawer = (state = false, action) => {
    if (action.type === SIDEBAR_DRAWER_TOGGLE) {
        return !state;
    }

    return state;
};

const tab = (state = {
    url: '',
    index: 0,
}, action) => {
    if (action.type === SIDEBAR_SELECTED_TAB_SET) {
        return {
            url: action.url,
            index: action.index,
        };
    }

    return state;
};

const showContent = (state = true, action) => {
    if (action.type === SIDE_BAR_CONTENT_SHOW) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    drawer,
    tab,
    showContent,
});
