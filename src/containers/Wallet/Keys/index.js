import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../../components/Dropdown';
import Icon from '../../../components/Icon';
import Settings from './Settings';

const Keys = ({
    items,
    index,
}) => {
    const onClick = () => {
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <Icon
                    className="icon"
                    icon="profile"
                />
                {items[index].name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    items.map((item, index) => (
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
