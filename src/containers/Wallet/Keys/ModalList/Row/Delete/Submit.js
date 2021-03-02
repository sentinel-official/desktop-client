import * as PropTypes from 'prop-types';
import { ValidatePassword } from '../../../../../common/_validation';
import { connect } from 'react-redux';
import { deleteKeys, getKeys } from '../../../../../../actions/keys';
import Button from '../../../../../../components/Button';
import React from 'react';

const Submit = (props) => {
    const onClick = () => {
        props.deleteKeys((error) => {
            if (error) {
                return;
            }

            props.getKeys();
        });
    };

    const disabled = (
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Delete"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    deleteKeys: PropTypes.func.isRequired,
    getKeys: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.keys.delete.inProgress,
        password: state.keys.delete.password,
    };
};

const actionsToProps = {
    deleteKeys,
    getKeys,
};

export default connect(stateToProps, actionsToProps)(Submit);
