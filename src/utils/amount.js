import { COIN_DECIMALS, COIN_DENOM } from '../constants/common';
import BigNumber from 'bignumber.js';
import _find from 'lodash/find';

export const floatCoinFromCoins = (coins, denom = COIN_DENOM, decimals = COIN_DECIMALS) => {
    if (coins.length === 0) {
        return new BigNumber('0');
    }

    const coin = _find(coins, ['denom', denom]);

    let amount = new BigNumber('0');
    if (coin) {
        amount = coin.value.toString();
        amount = new BigNumber(amount);
        amount = amount.dividedBy(Math.pow(10, decimals));
    }

    return amount;
};

export const validAmountFromInput = (amount, value, input, decimals = COIN_DECIMALS) => {
    if (input === value) {
        return undefined;
    }

    input = input.trim();
    if (input === '') {
        return input;
    }

    const splits = input.split('.');
    input = splits[0] === '' ? '0' : new BigNumber(splits[0]).toString();
    if (splits.length === 2) {
        input = input + '.' + splits[1].substring(0, decimals);
    }

    if (amount.isLessThan(new BigNumber(input))) {
        input = amount.toString();
    }

    if (input === value) {
        return undefined;
    }

    return input;
};
