import { managerBaseURL } from './common';

export const TX_DELEGATE_TO_SET = 'TX_DELEGATE_TO_SET';
export const TX_DELEGATE_AMOUNT_SET = 'TX_DELEGATE_AMOUNT_SET';
export const TX_DELEGATE_MEMO_SET = 'TX_DELEGATE_MEMO_SET';

export const TX_DELEGATE_MODAL_SHOW = 'TX_DELEGATE_MODAL_SHOW';
export const TX_DELEGATE_MODAL_HIDE = 'TX_DELEGATE_MODAL_HIDE';

export const TX_DELEGATE_IN_PROGRESS = 'TX_DELEGATE_IN_PROGRESS';
export const TX_DELEGATE_SUCCESS = 'TX_DELEGATE_SUCCESS';
export const TX_DELEGATE_ERROR = 'TX_DELEGATE_ERROR';

export const txDelegateURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/delegators/${address}/delegations`;
};

export const TX_REDELEGATE_FROM_SET = 'TX_REDELEGATE_FROM_SET';
export const TX_REDELEGATE_TO_SET = 'TX_REDELEGATE_TO_SET';
export const TX_REDELEGATE_AMOUNT_SET = 'TX_REDELEGATE_AMOUNT_SET';
export const TX_REDELEGATE_MEMO_SET = 'TX_REDELEGATE_MEMO_SET';

export const TX_REDELEGATE_MODAL_SHOW = 'TX_REDELEGATE_MODAL_SHOW';
export const TX_REDELEGATE_MODAL_HIDE = 'TX_REDELEGATE_MODAL_HIDE';

export const TX_REDELEGATE_IN_PROGRESS = 'TX_REDELEGATE_IN_PROGRESS';
export const TX_REDELEGATE_SUCCESS = 'TX_REDELEGATE_SUCCESS';
export const TX_REDELEGATE_ERROR = 'TX_REDELEGATE_ERROR';

export const txRedelegateURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/delegators/${address}/delegations/redelegate`;
};

export const TX_UNBOND_FROM_SET = 'TX_UNBOND_FROM_SET';
export const TX_UNBOND_AMOUNT_SET = 'TX_UNBOND_AMOUNT_SET';
export const TX_UNBOND_MEMO_SET = 'TX_UNBOND_MEMO_SET';

export const TX_UNBOND_MODAL_SHOW = 'TX_UNBOND_MODAL_SHOW';
export const TX_UNBOND_MODAL_HIDE = 'TX_UNBOND_MODAL_HIDE';

export const TX_UNBOND_IN_PROGRESS = 'TX_UNBOND_IN_PROGRESS';
export const TX_UNBOND_SUCCESS = 'TX_UNBOND_SUCCESS';
export const TX_UNBOND_ERROR = 'TX_UNBOND_ERROR';

export const txUnbondURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/delegators/${address}/delegations/undelegate`;
};

export const TX_WITHDRAW_FROM_SET = 'TX_WITHDRAW_FROM_SET';
export const TX_WITHDRAW_MEMO_SET = 'TX_WITHDRAW_MEMO_SET';

export const TX_WITHDRAW_MODAL_SHOW = 'TX_WITHDRAW_MODAL_SHOW';
export const TX_WITHDRAW_MODAL_HIDE = 'TX_WITHDRAW_MODAL_HIDE';

export const TX_WITHDRAW_IN_PROGRESS = 'TX_WITHDRAW_IN_PROGRESS';
export const TX_WITHDRAW_SUCCESS = 'TX_WITHDRAW_SUCCESS';
export const TX_WITHDRAW_ERROR = 'TX_WITHDRAW_ERROR';

export const txWithdrawURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/delegators/${address}/rewards`;
};

export const TX_SEND_TO_SET = 'TX_SENT_TO_SET';
export const TX_SEND_AMOUNT_SET = 'TX_SEND_AMOUNT_SET';
export const TX_SEND_MEMO_SET = 'TX_SEND_MEMO_SET';

export const TX_SEND_MODAL_SHOW = 'TX_SEND_MODAL_SHOW';
export const TX_SEND_MODAL_HIDE = 'TX_SEND_MODAL_HIDE';

export const TX_SEND_IN_PROGRESS = 'TX_SEND_IN_PROGRESS';
export const TX_SEND_SUCCESS = 'TX_SEND_SUCCESS';
export const TX_SEND_ERROR = 'TX_SEND_ERROR';

export const txSendURL = () => {
    const baseURL = managerBaseURL();
    return `${baseURL}/bank/send`;
};

export const TX_VOTE_ID_SET = 'TX_VOTE_ID_SET';
export const TX_VOTE_OPTION_SET = 'TX_VOTE_OPTION_SET';
export const TX_VOTE_MEMO_SET = 'TX_VOTE_MEMO_SET';

export const TX_VOTE_MODAL_SHOW = 'TX_VOTE_MODAL_SHOW';
export const TX_VOTE_MODAL_HIDE = 'TX_VOTE_MODAL_HIDE';

export const TX_VOTE_IN_PROGRESS = 'TX_VOTE_IN_PROGRESS';
export const TX_VOTE_SUCCESS = 'TX_VOTE_SUCCESS';
export const TX_VOTE_ERROR = 'TX_VOTE_ERROR';

export const txVoteURL = (id) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/proposals/${id}/votes`;
};

export const TX_INFO_MODAL_SHOW = 'TX_INFO_MODAL_SHOW';
export const TX_INFO_MODAL_HIDE = 'TX_INFO_MODAL_HIDE';
