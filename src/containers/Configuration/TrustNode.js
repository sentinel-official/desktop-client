import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainTrustNode } from '../../actions/configuration';
import ChipButton from '../../components/ChipButton';
import { ValidateTrustNode } from './_validation';

const options = [
    {
        key: 'yes',
        option: true,
        value: 'Yes',
    },
    {
        key: 'no',
        option: false,
        value: 'No',
    },
];

const TrustNode = (props) => {
    const onClick = (value) => {
        if (props.value === value) {
            return;
        }

        props.onClick({
            value,
            error: {
                message: ValidateTrustNode(value).message,
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

TrustNode.propTypes = {
    value: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.trustNode.value,
    };
};

const actionsToProps = {
    onClick: setConfigurationChainTrustNode,
};

export default connect(stateToProps, actionsToProps)(TrustNode);
