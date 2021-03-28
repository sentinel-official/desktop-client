import * as PropTypes from 'prop-types';
import { ValidateBroadcastMode } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainBroadcastMode } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import React from 'react';

const options = [
    {
        key: 'block',
        value: 'block',
        label: 'Block',
    },
    {
        key: 'sync',
        value: 'sync',
        label: 'Sync',
    },
    {
        key: 'async',
        value: 'async',
        label: 'Async',
    },
];

const BroadcastMode = (props) => {
    const onClick = (value) => {
        if (props.input.value === value) {
            return;
        }

        props.onClick({
            value,
            error: ValidateBroadcastMode(value),
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

BroadcastMode.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.configuration.chain.broadcastMode,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainBroadcastMode,
};

export default connect(stateToProps, actionsToProps)(BroadcastMode);
