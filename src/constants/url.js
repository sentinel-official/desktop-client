const URL = 'http://localhost:11000';

export const KEYS_GET = `${URL}/keys`;
export const TRANSFER_TOKENS = `${URL}/transfer`;
export const VALIDATORS_LIST_URL = `${URL}/validators`;
export const WITHDRAW_ALL_URL = `${URL}/accounts/withdraw-all-rewards`;
export const FAUCET_URL = 'http://51.83.120.246:8000/transfer';

export const getWalletDetailsURL = (address) => {
    return `${URL}/accounts/${address}`;
};

export const getDelegationsValidatorsURL = (address) => {
    return `${URL}/accounts/${address}/delegations`;
};

export const reDelegateURL = (address) => {
    return `${URL}/delegation/${address}`;
};

export const delegationURL = (address) => {
    return `${URL}/delegations/${address}`;
};

export const transactionHashURL = (hash) => {
    return `${URL}/txs/${hash}`;
};

export const withdrawURL = (address) => {
    return `${URL}/accounts/withdraw-rewards/${address}`;
};

export const getValidatorsListURL = (status) => {
    return `${URL}/validators?status=${status}`;
};

export const unBondURL = (address) => {
    return `${URL}/delegation/${address}`;
};

export const deleteAccountURL = (name) => {
    return `${URL}/keys/${name}`;
};

export const fetchTransactionsURL = (address, type) => {
    return `${URL}/txs/bank/${address}?type=${type}`;
};

export const fetchOtherTransactionsURL = (address) => {
    return `${URL}/txs?signers=${address}`;
};
