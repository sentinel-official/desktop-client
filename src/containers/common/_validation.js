export const ValidateMemo = (value) => {
    return new Error('');
};

export const ValidatePassword = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    return new Error('');
};
