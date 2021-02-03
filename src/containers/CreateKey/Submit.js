import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { postKeys } from '../../actions/keys';
import Button from '../../components/Button';

const Submit = (props) => {
    const onClick = () => {
        props.onClick({
            mnemonic: props.mnemonic.trim(),
            name: props.name.trim(),
            password: props.password.trim(),
        }, props.history, () => {
        });
    };

    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={props.inProgress}
            type="button"
            value="Create"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    inProgress: PropTypes.bool.isRequired,
    mnemonic: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        mnemonic: state.keys.post.mnemonic.value,
        name: state.keys.post.name.value,
        password: state.keys.post.password.value,
        inProgress: state.keys.post.inProgress,
    };
};

const actionsToProps = {
    onClick: postKeys,
};

export default connect(stateToProps, actionsToProps)(Submit);
