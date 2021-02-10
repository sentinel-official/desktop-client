import * as PropTypes from 'prop-types';
import Button from '../../components/Button';
import React from 'react';

const Continue = (props) => {
    const onClick = () => {
        props.history.push('/dashboard/wallet');
    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            type="button"
            value="Continue"
            onClick={onClick}
        />
    );
};

Continue.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Continue;
