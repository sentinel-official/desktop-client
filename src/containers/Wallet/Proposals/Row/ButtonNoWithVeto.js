import * as PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../../components/Button';

const ButtonNoWithVeto = (props) => {
    const onClick = () => {
    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            type="button"
            value="NoWithVeto"
            onClick={onClick}
        />
    );
};

ButtonNoWithVeto.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonNoWithVeto;
