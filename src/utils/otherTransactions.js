export const type = (value) => {
    const type = value.split('/');

    if (type.length === 0) {
        return null;
    }

    return type[0];
};

export const transactionType = (value) => {
    const type = value.split('/');

    if (type.length === 0) {
        return null;
    }

    return type[1];
};

export const removeUnderScore = (value) => {
    return value.split('_').join(' ');
};
