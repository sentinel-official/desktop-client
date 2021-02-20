import globals from './globals';

export const managerBaseURL = () => {
    return `${globals.listenURL}/api/v1`;
};

export const emptyFunc = () => ({});

export const COIN_DENOM = 'TSENT'.toLowerCase();
