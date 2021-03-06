import * as PropTypes from 'prop-types';
import { ValidateSimulateAndExecute } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainSimulateAndExecute } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import React from 'react';

const options = [
    {
        key: 'yes',
        value: true,
        label: 'Yes',
    },
    {
        key: 'no',
        value: false,
        label: 'No',
    },
];

const SimulateAndExecute = (props) => {
    const onClick = (value) => {
        if (props.input.value === value) {
            return;
        }

        props.onClick({
            value,
            error: ValidateSimulateAndExecute(value),
        });
    };

    return (
        <div className="button-group">
            {
                options.map((item) => {
                    return (
                        <ChipButton
                            key={item.key}
                            className={props.input.value === item.value ? 'selected' : 'primary'}
                            label={item.label}
                            type="button"
                            onClick={() => onClick(item.value)}
                        />
                    );
                })
            }
        </div>
    );
};

SimulateAndExecute.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.bool.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.configuration.chain.simulateAndExecute,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainSimulateAndExecute,
};

export default connect(stateToProps, actionsToProps)(SimulateAndExecute);
