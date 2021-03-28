import {
    CONFIGURATION_CHAIN_BROADCAST_MODE_SET,
    CONFIGURATION_CHAIN_FEES_SET,
    CONFIGURATION_CHAIN_GAS_ADJUSTMENT_SET,
    CONFIGURATION_CHAIN_GAS_PRICES_SET,
    CONFIGURATION_CHAIN_GAS_SET,
    CONFIGURATION_CHAIN_ID_SET,
    CONFIGURATION_CHAIN_RPC_ADDRESS_SET,
    CONFIGURATION_CHAIN_SIMULATE_AND_EXECUTE_SET,
    CONFIGURATION_CHAIN_TRUST_NODE_SET,
    CONFIGURATION_GET_SUCCESS,
    CONFIGURATION_PUT_SUCCESS,
} from '../../constants/configuration';
import { combineReducers } from 'redux';

const broadcastMode = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['broadcast_mode'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_BROADCAST_MODE_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const fees = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain.fees,
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_FEES_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const gasAdjustment = (state = {
    value: 0,
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['gas_adjustment'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_GAS_ADJUSTMENT_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const gasPrices = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['gas_prices'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_GAS_PRICES_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const gas = (state = {
    value: 0,
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain.gas,
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_GAS_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const id = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain.id,
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_ID_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const RPCAddress = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['rpc_address'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_RPC_ADDRESS_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const simulateAndExecute = (state = {
    value: false,
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['simulate_and_execute'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_SIMULATE_AND_EXECUTE_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const trustNode = (state = {
    value: false,
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.chain['trust_node'],
            error: {
                message: '',
            },
        };
    case CONFIGURATION_CHAIN_TRUST_NODE_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

export default combineReducers({
    broadcastMode,
    fees,
    gasAdjustment,
    gasPrices,
    gas,
    id,
    RPCAddress,
    simulateAndExecute,
    trustNode,
});
