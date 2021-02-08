import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setValidatorsActionSet } from '../../../actions/validators';
import Dropdown from '../../../components/Dropdown';

const options = [
    {
        label: 'Delegate',
    },
    {
        label: 'Redelegate',
    },
    {
        label: 'Unbond',
    },
];

const Actions = (props) => {
    const onClick = (index) => {
        props.onClick(index);
    };

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
                                onClick={() => onClick(index)}>
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
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.validators.action,
    };
};

const actionsToProps = {
    onClick: setValidatorsActionSet,
};

export default connect(stateToProps, actionsToProps)(Actions);
