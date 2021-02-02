import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { putConfiguration } from '../../actions/configuration';
import Button from '../../components/Button';

const Submit = (props) => {
    const onClick = () => {
        props.onClick({
            chain: {
                broadcast_mode: props.chain.broadcastMode.trim(),
                fees: props.chain.fees.trim(),
                gas_adjustment: props.chain.gasAdjustment,
                gas_prices: props.chain.gasPrices.trim(),
                gas: props.chain.gas,
                id: props.chain.id.trim(),
                rpc_address: props.chain.RPCAddress.trim(),
                simulate_and_execute: props.chain.simulateAndExecute,
                trust_node: props.chain.trustNode,
            },
            setup: false,
        }, props.history, () => {
        });
    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            loading={false}
            type="button"
            value="Save"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    chain: PropTypes.shape({
        broadcastMode: PropTypes.string.isRequired,
        fees: PropTypes.string.isRequired,
        gasAdjustment: PropTypes.number.isRequired,
        gasPrices: PropTypes.string.isRequired,
        gas: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        RPCAddress: PropTypes.string.isRequired,
        simulateAndExecute: PropTypes.bool.isRequired,
        trustNode: PropTypes.bool.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chain: {
            broadcastMode: state.configuration.chain.broadcastMode.value,
            fees: state.configuration.chain.fees.value,
            gasAdjustment: state.configuration.chain.gasAdjustment.value,
            gasPrices: state.configuration.chain.gasPrices.value,
            gas: state.configuration.chain.gas.value,
            id: state.configuration.chain.id.value,
            RPCAddress: state.configuration.chain.RPCAddress.value,
            simulateAndExecute: state.configuration.chain.simulateAndExecute.value,
            trustNode: state.configuration.chain.trustNode.value,
        },
    };
};

const actionsToProps = {
    onClick: putConfiguration,
};

export default connect(stateToProps, actionsToProps)(Submit);
