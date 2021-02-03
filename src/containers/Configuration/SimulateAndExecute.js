import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainSimulateAndExecute } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import { ValidateSimulateAndExecute } from './_validation';

const options = [
    {
        key: 'Yes',
        option: true,
        value: 'Yes',
    },
    {
        key: 'No',
        option: false,
        value: 'No',
    },
];

const SimulateAndExecute = (props) => {
    const onClick = (value) => {
        if (props.value === value) {
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
                            className={props.value === item.option ? 'selected' : 'primary'}
                            type="button"
                            value={item.value}
                            onClick={() => onClick(item.option)}
                        />
                    );
                })
            }
        </div>
    );
};

SimulateAndExecute.propTypes = {
    value: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.simulateAndExecute.value,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainSimulateAndExecute,
};

export default connect(stateToProps, actionsToProps)(SimulateAndExecute);
