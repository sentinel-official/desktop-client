import * as PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

const Switch = ({
    className,
    id,
    checked,
    label,
    onChange,
}) => {
    return (
        <Form.Check
            custom
            checked={checked}
            className={className}
            id={id}
            label={label}
            type="switch"
            onChange={onChange}
        />
    );
};
Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default Switch;
