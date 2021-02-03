import * as PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Icon from '../Icon';
import './index.css';

const DropdownList = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle>
                {props.value
                    ? props.value
                    : props.config.options[0].label
                }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    props.config.options.map((item, index) => (
                        <Dropdown.Item key={index} onClick={props.onClick}>
                            {item.icon
                                ? <Icon
                                    className="icon"
                                    icon={item.icon}
                                />
                                : ''
                            }
                            {item.label}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};
DropdownList.propTypes = {
    config: PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        icon: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default DropdownList;
