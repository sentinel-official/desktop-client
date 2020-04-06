import { Fab, Tooltip, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import Clipboard from '../../utils/clipboard';
import Icon from '../Icon';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const CopyToClipboard = (props) => {
    return (
        <div className="copy_div">
            <p className="copy_text">{props.data}</p>
            <LightTooltip
                placement="right"
                title="Copy">
                <Fab
                    aria-label="add"
                    className="information_button"
                    color="secondary"
                    size="small"
                    onClick={() => Clipboard(props.data)}>
                    <Icon
                        className="copy"
                        icon="copy"/>
                </Fab>
            </LightTooltip>
        </div>
    );
};

CopyToClipboard.propTypes = {
    data: PropTypes.string.isRequired,
};

export default CopyToClipboard;
