import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainBroadcastMode } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import { ValidateBroadcastMode } from './_validation';

const options = [
    {
        key: 'block',
        option: 'block',
        value: 'Block',
    },
    {
        key: 'sync',
        option: 'sync',
        value: 'Sync',
    },
    {
        key: 'async',
        option: 'async',
        value: 'Async',
    },
];

const BroadcastMode = (props) => {
    const onClick = (value) => {
        if (props.value === value) {
            return;
        }

        props.onClick({
            value,
            error: {
                message: ValidateBroadcastMode(value).message,
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

BroadcastMode.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.broadcastMode.value,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainBroadcastMode,
};

export default connect(stateToProps, actionsToProps)(BroadcastMode);
