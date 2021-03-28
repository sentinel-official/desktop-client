import './index.css';
import * as PropTypes from 'prop-types';
import Icon from '../Icon';
import React from 'react';

const Tooltip = ({
    value,
    icon,
}) => {
    return (
        <div
            className="tooltip-section"
            data-placement="top"
            data-toggle="tooltip"
            title={value}>
            <Icon
                className="icon"
                icon={icon}
            />
        </div>
    );
};

Tooltip.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Tooltip;
