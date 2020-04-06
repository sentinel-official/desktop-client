import Axios from 'axios';
import {
    ACTIVE_BUTTON_SWITCH_SET,
    ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
    DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR,
    DELEGATIONS_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
    OUT_OF_GAS,
    STACKING_TAB_VALUE_SET,
    VALIDATORS_LIST_FETCH_ERROR,
    VALIDATORS_LIST_FETCH_IN_PROGRESS,
    VALIDATORS_LIST_FETCH_SET,
    VALIDATORS_LIST_FETCH_SUCCESS,
} from '../constants/staking';
import { getDelegationsValidatorsURL, getValidatorsListURL, VALIDATORS_LIST_URL } from '../constants/url';

export const setTabValue = (value) => {
    return {
        type: STACKING_TAB_VALUE_SET,
        value,
    };
};

const fetchValidatorsListInProgress = () => {
    return {
        type: VALIDATORS_LIST_FETCH_IN_PROGRESS,
    };
};

const fetchValidatorsListSuccess = (items) => {
    return {
        type: VALIDATORS_LIST_FETCH_SUCCESS,
        items,
    };
};

const fetchValidatorsListError = (error) => {
    return {
        type: VALIDATORS_LIST_FETCH_ERROR,
        error,
    };
};

export const fetchValidatorsList = () => (dispatch) => {
    dispatch(fetchValidatorsListInProgress());

    Axios.get(VALIDATORS_LIST_URL)
        .then((res) => {
            const items = [];

            res.data && res.data.result &&
            res.data.result.result &&
            res.data.result.result.map((value) => {
                const data = {
                    title: value.description.moniker,
                    address: value.address,
                };

                return items.push(data);
            });

            dispatch(fetchValidatorsListSuccess(items));
        })
        .catch((error) => {
            dispatch(fetchValidatorsListError(error.response && error.response.data && error.response.data.error));
        });
};

const fetchDelegationsValidatorsListInProgress = () => {
    return {
        type: DELEGATIONS_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    };
};

const fetchDelegationsValidatorsListSuccess = (items) => {
    return {
        type: DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS,
        items,
    };
};

const fetchDelegationsValidatorsListError = (error) => {
    return {
        type: DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR,
        error,
    };
};

export const fetchDelegationsValidatorsList = (address) => (dispatch) => {
    dispatch(fetchDelegationsValidatorsListInProgress());

    const url = getDelegationsValidatorsURL(address);
    Axios.get(url)
        .then((res) => {
            dispatch(fetchDelegationsValidatorsListSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchDelegationsValidatorsListError(error.response && error.response.data && error.response.data.error));
        });
};

const fetchActiveValidatorsListInProgress = () => {
    return {
        type: ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    };
};

const fetchActiveValidatorsListSuccess = (items) => {
    return {
        type: ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
        items,
    };
};

const fetchActiveValidatorsListError = (error) => {
    return {
        type: ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
        error,
    };
};

export const fetchActiveValidatorsList = () => (dispatch) => {
    dispatch(fetchActiveValidatorsListInProgress());

    const url = getValidatorsListURL('active');
    Axios.get(url)
        .then((res) => {
            dispatch(fetchActiveValidatorsListSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchActiveValidatorsListError(error.response && error.response.data && error.response.data.error));
        });
};

const fetchInActiveValidatorsListInProgress = () => {
    return {
        type: IN_ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    };
};

const fetchInActiveValidatorsListSuccess = (items) => {
    return {
        type: IN_ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
        items,
    };
};

const fetchInActiveValidatorsListError = (error) => {
    return {
        type: IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
        error,
    };
};

export const fetchInActiveValidatorsList = () => (dispatch) => {
    dispatch(fetchInActiveValidatorsListInProgress());

    const url = getValidatorsListURL('inactive');
    Axios.get(url)
        .then((res) => {
            dispatch(fetchInActiveValidatorsListSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchInActiveValidatorsListError(error.response && error.response.data && error.response.data.error));
        });
};

export const setButtonSwitch = (value) => {
    return {
        type: ACTIVE_BUTTON_SWITCH_SET,
        value,
    };
};

export const setValidatorsListFetch = () => {
    return {
        type: VALIDATORS_LIST_FETCH_SET,
    };
};

export const outOfGas = (message) => {
    return {
        type: OUT_OF_GAS,
        message,
    };
};
