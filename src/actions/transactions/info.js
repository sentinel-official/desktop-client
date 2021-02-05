import { TX_INFO_MODAL_HIDE, TX_INFO_MODAL_SHOW } from '../../constants/transactions';

export const setTxInfoModalShow = (data) => {
    return {
        type: TX_INFO_MODAL_SHOW,
        data,
    };
};

export const setTxInfoModalHide = (data) => {
    return {
        type: TX_INFO_MODAL_HIDE,
        data,
    };
};
