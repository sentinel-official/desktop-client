import { LOAD_APP } from '../constants/appLoader';

export const loadApplication = () => (dispatch) => {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.remove();
    }

    dispatch({
        type: LOAD_APP,
    });
};
