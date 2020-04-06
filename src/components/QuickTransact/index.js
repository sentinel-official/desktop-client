import { Fab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import quickTransactIcon from '../../assets/quick_transact.png';
import variables from '../../dummy/variables';
import './index.css';

const QuickTransact = (props) => {
    return (
        <div className="quick_transact">
            <Fab
                aria-label="add"
                className="quick_transact_button"
                color="primary"
                disabled={!props.disable}
                size="medium"
                variant="extended"
                onClick={props.onClick}>
                <img alt="Quick transaction icon" src={quickTransactIcon}/>
                <p className="text">{variables[props.lang].quick_transact}</p>
            </Fab>
        </div>
    );
};

QuickTransact.propTypes = {
    disable: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default QuickTransact;
