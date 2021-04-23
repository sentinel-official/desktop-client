const bip39 = require('bip39');

export const ValidateMemo = (value) => {
    if (bip39.validateMnemonic(value.trim())) {
        return new Error(
            'This looks like a mnemonic. Please do not attach the mnemonic ' +
            'or other sensitive data to note, as it is public and can be seen by anyone.');
    }

    return new Error('');
};

export const ValidatePassword = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    return new Error('');
};
