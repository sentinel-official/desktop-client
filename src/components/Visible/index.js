import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Visible = ({
    onClick,
    visible,
}) => {
    return (
        <div className="password-icon">
            <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={onClick}>
                {visible ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
        </div>
    );
};

Visible.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default React.memo(Visible);
