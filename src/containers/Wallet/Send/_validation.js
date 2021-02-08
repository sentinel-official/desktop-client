import Bech32 from 'bech32';

export const ValidateAmount = (value) => {
    return new Error('');
};

export const ValidateTo = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    try {
        Bech32.decode(value);
        return new Error('');
    } catch (e) {
        return e;
    }
};
