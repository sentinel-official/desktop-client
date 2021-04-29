export const ValidateMnemonicSaved = (saved) => {
    if (saved === false) {
        return new Error('Mnemonic not saved');
    }

    return new Error('');
};
