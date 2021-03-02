import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putConfiguration } from '../../../../../actions/configuration';
import { setKeysDeleteNameSet, setKeysName } from '../../../../../actions/keys';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Select = ({
    name,
    deleteInProgress,
    putConfiguration,
    active,
    setKeysName,
    setKeysDeleteNameSet,
}) => {
    const onClick = () => {
        if (name === active) {
            return;
        }
        if (deleteInProgress) {
            return;
        }

        setKeysDeleteNameSet('');
        putConfiguration(name, (error) => {
            if (error) {
                return;
            }

            setKeysName(name);
        });
    };

    return (
        <Tooltip title="Select">
            <IconButton
                size="small"
                onClick={onClick}>
                <CheckCircleIcon/>
            </IconButton>
        </Tooltip>
    );
};

Select.propTypes = {
    active: PropTypes.string.isRequired,
    deleteInProgress: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    putConfiguration: PropTypes.func.isRequired,
    setKeysDeleteNameSet: PropTypes.func.isRequired,
    setKeysName: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        deleteInProgress: state.keys.delete.inProgress,
    };
};

const actionsToProps = {
    setKeysName,
    putConfiguration,
    setKeysDeleteNameSet,
};

export default connect(stateToProps, actionsToProps)(Select);
