import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from '../../../components/Dropdown';
import Icon from '../../../components/Icon';
import ModalConfiguration from '../../common/ModalConfiguration';
import ModalCreate from './ModalCreate';
import ModalInfo from './ModalInfo';
import ModalList from './ModalList';
import React from 'react';
import Settings from './Settings';
import ShowList from './ShowList';
import TextBox from '../../../components/TextBox';

const Keys = ({
    name,
    history,
}) => {
    return (
        <>
            <ModalList/>
            <ModalCreate/>
            <ModalInfo/>
            <ModalConfiguration history={history}/>
            <Dropdown>
                <Dropdown.Toggle className="flex-center">
                    <Icon
                        className="icon"
                        icon="profile"
                    />
                    <TextBox
                        className="dropdown-title"
                        value={name}
                    />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <ShowList/>
                    <Settings/>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

Keys.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        name: state.keys.name,
    };
};

export default connect(stateToProps)(Keys);
