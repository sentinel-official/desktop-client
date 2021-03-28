import * as PropTypes from 'prop-types';
import { ValidateMnemonic, ValidateName, ValidatePassword } from '../../../CreateKey/_validation';
import { connect } from 'react-redux';
import { hideKeysCreateModal, postKeys, showKeysInfoModal } from '../../../../actions/keys';
import Button from '../../../../components/Button';
import React from 'react';

const Submit = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.postKeys(null, (error) => {
            if (error) {
                return;
            }

            props.hideKeysCreateModal();
            props.showKeysInfoModal();
        });
    };

    const disabled = (
        ValidateMnemonic(props.mnemonic.value).message !== '' ||
        ValidateName(props.name.value).message !== '' ||
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Create"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    hideKeysCreateModal: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    mnemonic: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    name: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    postKeys: PropTypes.func.isRequired,
    showKeysInfoModal: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        mnemonic: state.keys.post.mnemonic,
        name: state.keys.post.name,
        password: state.keys.post.password,
        inProgress: state.keys.post.inProgress,
    };
};

const actionsToProps = {
    hideKeysCreateModal,
    postKeys,
    showKeysInfoModal,
};

export default connect(stateToProps, actionsToProps)(Submit);
