import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setKeyMnemonicSaved } from '../../actions/keys';
import Checkbox from '../../components/Checkbox';
import React from 'react';

const Note = ({
    checked,
    setKeyMnemonicSaved,
}) => {
    const onChange = ({ target: { checked } }) => {
        setKeyMnemonicSaved({
            saved: checked,
        });
    };

    return (
        <Checkbox
            checked={checked}
            className="custom-control-input"
            onChange={onChange}
        />
    );
};

Note.propTypes = {
    checked: PropTypes.bool.isRequired,
    setKeyMnemonicSaved: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        checked: state.keys.post.mnemonic.saved,
    };
};

const actionsToProps = {
    setKeyMnemonicSaved,
};

export default connect(stateToProps, actionsToProps)(Note);
