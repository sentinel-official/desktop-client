export const ValidatePassword = (value) => {
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    return new Error('');
};
