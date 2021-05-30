import * as PropTypes from 'prop-types';
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

    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
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
};

const stateToProps = (state) => {
    return {
        inProgress: state.keys.delete.inProgress,
    };
};

const actionsToProps = {
    deleteKeys,
    getKeys,
};

export default connect(stateToProps, actionsToProps)(Submit);
