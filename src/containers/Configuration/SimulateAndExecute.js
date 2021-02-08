import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainSimulateAndExecute } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import { ValidateSimulateAndExecute } from './_validation';

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
            error: {
                message: ValidateSimulateAndExecute(value).message,
            },
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
