import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setValidatorsFilterStatus } from '../../../actions/validators';
import ChipButton from '../../../components/ChipButton';
import React from 'react';

const options = [
    {
        key: 'active',
        value: 1,
        label: 'Active',
    },
    {
        key: 'inactive',
        value: 0,
        label: 'Inactive',
    },
];

const Status = (props) => {
    return (
        <div className="button-group buttons-state">
            {
                options.map((item) => {
                    return (
                        <ChipButton
                            key={item.key}
                            className={props.value === item.value ? 'active' : 'primary'}
                            label={item.label}
                            type="button"
                            onClick={() => props.onClick(item.value)}
                        />
                    );
                })
            }
        </div>
    );
};

Status.propTypes = {
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.validators.status,
    };
};

const actionsToProps = {
    onClick: setValidatorsFilterStatus,
};

export default connect(stateToProps, actionsToProps)(Status);
