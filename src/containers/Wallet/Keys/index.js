import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../../components/Dropdown';
import Icon from '../../../components/Icon';
import TextBox from '../../../components/TextBox';
import Settings from './Settings';

const Keys = (props) => {
    const onClick = (event) => {
    };

    return (
        <Dropdown>
            <Dropdown.Toggle className="flex-center">
                <Icon
                    className="icon"
                    icon="profile"
                />
                <TextBox className="dropdown-title" value={props.items[props.index]?.name}/>
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
                            <TextBox className="dropdown-item-text" value={item.name}/>
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
