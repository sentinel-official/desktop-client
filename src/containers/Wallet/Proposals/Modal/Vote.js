import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button';

const Vote = (props) => {
    const onClick = () => {

    };

    const disabled = true;

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Vote"
            onClick={onClick}
        />
    );
};

Vote.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect()(Vote);
