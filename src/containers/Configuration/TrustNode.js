import * as PropTypes from 'prop-types';
import { ValidateTrustNode } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainTrustNode } from '../../actions/configuration';
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

const TrustNode = (props) => {
    const onClick = (value) => {
        if (props.input.value === value) {
            return;
        }

        props.onClick({
            value,
            error: ValidateTrustNode(value),
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

TrustNode.propTypes = {
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
        input: state.configuration.chain.trustNode,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainTrustNode,
};

export default connect(stateToProps, actionsToProps)(TrustNode);
