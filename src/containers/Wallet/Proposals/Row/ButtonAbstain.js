import * as PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import React from 'react';

const ButtonAbstain = (props) => {
    const onClick = () => {
    };

    const disabled = false;

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Abstain"
            onClick={onClick}
        />
    );
};

ButtonAbstain.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonAbstain;
