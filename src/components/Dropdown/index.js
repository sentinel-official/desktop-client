import * as PropTypes from 'prop-types';
import React from 'react';
import { Dropdown as ReactDropdown } from 'react-bootstrap';
import Icon from '../Icon';
import './index.css';

const Dropdown = ({
    config,
    value,
    onClick,
}) => {
    return (
        <ReactDropdown>
            <ReactDropdown.Toggle>
                {
                    value || config.options[0].label
                }
            </ReactDropdown.Toggle>
            <ReactDropdown.Menu>
                {
                    config.options.map((item, index) => (
                        <ReactDropdown.Item
                            key={index}
                            onClick={onClick}>
                            {
                                item.icon
                                    ? <Icon
                                        className="icon"
                                        icon={item.icon}
                                    />
                                    : null
                            }
                            {item.label}
                        </ReactDropdown.Item>
                    ))
                }
            </ReactDropdown.Menu>
        </ReactDropdown>
    );
};

Dropdown.propTypes = {
    config: PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        icon: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Dropdown;
