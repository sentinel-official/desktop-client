import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setValidatorsActionSet } from '../../../actions/validators';
import Dropdown from '../../../components/Dropdown';

const Actions = (props) => {
    const options = [
        { label: 'Delegate' },
        { label: 'Redelegate' },
        { label: 'Unbond' },
    ];

    if (props.status === 0) {
        options.splice(0, 1);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle>
                {options[props.index]?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    options.map((item, index) => (
                        index === props.index
                            ? null
                            : <Dropdown.Item
                                key={index}
                                onClick={() => props.onClick(index)}>
                                {item.label}
                            </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

Actions.propTypes = {
    index: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.validators.action,
        status: state.validators.status,
    };
};

const actionsToProps = {
    onClick: setValidatorsActionSet,
};

export default connect(stateToProps, actionsToProps)(Actions);