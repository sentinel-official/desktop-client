import * as PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import Icon from '../../../components/Icon';
import Settings from './Settings';

const Keys = (props) => {
    const onClick = (event) => {
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <Icon
                    className="icon"
                    icon="profile"
                />
                {props.items[props.index]?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    props.items.map((item, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={onClick}>
                            <Icon
                                className="icon"
                                icon="profile"
                            />
                            {item.name}
                        </Dropdown.Item>
                    ))
                }
                <Settings/>
            </Dropdown.Menu>
        </Dropdown>
    );
};

Keys.propTypes = {
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    ),
};

const stateToProps = (state) => {
    return {
        index: state.keys.index,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(Keys);
