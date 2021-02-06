import * as PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../../components/Button';

const ButtonNo = (props) => {
    const onClick = () => {
    };

    const disabled = false;

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="No"
            onClick={onClick}
        />
    );
};

ButtonNo.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonNo;
