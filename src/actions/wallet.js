import Axios from 'axios';
import { getWalletDetailsURL, TRANSFER_TOKENS } from '../constants/url';
import {
    ADDRESS_TO_SEND_SET,
    GAS_PRICE_DECREMENT_SET,
    GAS_PRICE_INCREMENT_SET,
    GAS_PRICE_SET,
    PASSWORD_SET,
    TAB_VALUE_SET,
    TOKEN_TYPE_SET,
    TOKENS_TO_SEND_SET,
    TRANSACTION_TAB_VALUE_SET,
    TRANSFER_TOKENS_ERROR,
    TRANSFER_TOKENS_IN_PROGRESS,
    TRANSFER_TOKENS_SUCCESS,
    WALLET_DETAILS_GET_ERROR,
    WALLET_DETAILS_GET_IN_PROGRESS,
    WALLET_DETAILS_GET_SUCCESS,
    WALLET_TAB_SHOW,
    WALLET_TRANSACTION_SHOW,
} from '../constants/wallet';
import { outOfGas } from './staking';

export const setTabValue = (value) => {
    return {
        type: TAB_VALUE_SET,
        value,
    };
};

export const showTransaction = () => {
    return {
        type: WALLET_TRANSACTION_SHOW,
    };
};

export const setTransactionTabValue = (value) => {
    return {
        type: TRANSACTION_TAB_VALUE_SET,
        value,
    };
};

export const showWallet = () => {
    return {
        type: WALLET_TAB_SHOW,
    };
};

export const setAddressToSend = (value) => {
    return {
        type: ADDRESS_TO_SEND_SET,
        value,
    };
};

export const setTokensToSend = (value) => {
    return {
        type: TOKENS_TO_SEND_SET,
        value,
    };
};

export const setTokenType = (value) => {
    return {
        type: TOKEN_TYPE_SET,
        value,
    };
};

export const setGasPrice = (value) => {
    return {
        type: GAS_PRICE_SET,
        value,
    };
};

export const setGasPriceIncrement = () => {
    return {
        type: GAS_PRICE_INCREMENT_SET,
    };
};

export const setGasPriceDecrement = () => {
    return {
        type: GAS_PRICE_DECREMENT_SET,
    };
};

export const setPassword = (value) => {
    return {
        type: PASSWORD_SET,
        value,
    };
};

const getWalletDetailsInProgress = () => {
    return {
        type: WALLET_DETAILS_GET_IN_PROGRESS,
    };
};

const getWalletDetailsSuccess = (items) => {
    return {
        type: WALLET_DETAILS_GET_SUCCESS,
        items,
    };
};

const getWalletDetailsError = (error) => {
    return {
        type: WALLET_DETAILS_GET_ERROR,
        error,
    };
};

export const getWalletDetails = (address) => (dispatch) => {
    dispatch(getWalletDetailsInProgress());

    const url = getWalletDetailsURL(address);
    Axios.get(url)
        .then((res) => {
            dispatch(getWalletDetailsSuccess(res.data.result.coins));
        })
        .catch((error) => {
            dispatch(getWalletDetailsError(error.response && error.response.data && error.response.data.error));
        });
};

const tokensTransferInProgress = () => {
    return {
        type: TRANSFER_TOKENS_IN_PROGRESS,
    };
};

const tokensTransferSuccess = (message, hash) => {
    return {
        type: TRANSFER_TOKENS_SUCCESS,
        message,
        hash,
    };
};

const tokensTransferError = (error) => {
    return {
        type: TRANSFER_TOKENS_ERROR,
        error,
    };
};

export const tokensTransfer = (data, cb) => (dispatch) => {
    dispatch(tokensTransferInProgress());

    Axios.post(TRANSFER_TOKENS, data)
        .then((res) => {
            if (res.data.result.code && res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(tokensTransferSuccess('Success', res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(tokensTransferError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
