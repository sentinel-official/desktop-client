export const ValidateBroadcastMode = (value) => {
    return new Error('');
};

export const ValidateID = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    return new Error('');
};

export const ValidateFees = (value) => {
    return new Error('');
};

export const ValidateGas = (value) => {
    return new Error('');
};

export const ValidateGasAdjustment = (value) => {
    return new Error('');
};

export const ValidateGasPrices = (value) => {
    return new Error('');
};

export const ValidateRPCAddress = (value) => {
    value = value.trim();
    if (value.length === 0) {
        return new Error('Length must be greater than 0');
    }

    return new Error('');
};

export const ValidateTrustNode = (value) => {
    return new Error('');
};

export const ValidateSimulateAndExecute = (value) => {
    return new Error('');
};
