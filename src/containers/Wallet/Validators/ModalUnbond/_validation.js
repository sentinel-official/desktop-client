export const ValidateAmount = (value) => {
    if (value === 0) {
        return new Error('Value must be greater than 0');
    }

    return new Error('');
};
