import {
    ACCOUNT_CREATION_STEP_SET,
    ACCOUNT_CREATION_TAB_VALUE_SET,
    ACCOUNT_NAME_SET,
    CONTINUE_BUTTON_SHOW,
    MISSING_SEED_INDEX,
    PASSWORD_SET,
    SEED_VALUES_SET,
} from '../constants/account';

export const setAccountCreationStep = (value) => {
    return {
        type: ACCOUNT_CREATION_STEP_SET,
        value,
    };
};

export const setAccountName = (value) => {
    return {
        type: ACCOUNT_NAME_SET,
        value,
    };
};

export const setPassword = (value) => {
    return {
        type: PASSWORD_SET,
        value,
    };
};

export const setMissingSeed = (value) => {
    return {
        type: MISSING_SEED_INDEX,
        value,
    };
};

export const setSeedValues = (value) => {
    return {
        type: SEED_VALUES_SET,
        value,
    };
};

export const showContinueButton = (value) => {
    return {
        type: CONTINUE_BUTTON_SHOW,
        value,
    };
};

export const setTabValue = (value) => {
    return {
        type: ACCOUNT_CREATION_TAB_VALUE_SET,
        value,
    };
};
