import * as PropTypes from 'prop-types';
import React from 'react';
import { Dropdown as ReactDropdown } from 'react-bootstrap';
import Icon from '../Icon';
import './index.css';

const Dropdown = ({
    index,
    options,
    onClick,
}) => {
    return (
        <ReactDropdown>
            <ReactDropdown.Toggle>
                {
                    options[index].icon
                        ? <Icon
                            className="icon"
                            icon={options[index].icon}
                        />
                        : null
                }
                {
                    options[index].label
                }
            </ReactDropdown.Toggle>
            <ReactDropdown.Menu>
                {
                    options.map((item, index) => (
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
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        }),
    ),
};

export default Dropdown;
