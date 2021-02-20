import { bech32 } from 'bech32';

export const ValidateAmount = (value) => {
    if (value === 0) {
        return new Error('Value must be greater than 0');
    }

    return new Error('');
};

export const ValidateToAddress = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    try {
        bech32.decode(value);
        return new Error('');
    } catch (e) {
        return e;
    }
};
