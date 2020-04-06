import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setTabValue, showTransaction } from '../../actions/wallet';
import QuickTransactButton from '../../components/QuickTransact';

const QuickTransact = (props) => {
    const handleClick = () => {
        if (props.history.location.pathname !== '/wallet') {
            props.history.push({
                pathname: '/wallet',
            });
        }
        if (props.transaction === false) {
            props.showTransaction();
        }
        if (props.tabValue !== 0) {
            props.setTabValue(0);
        }
    };

    const disable = props.tabValue !== 0 || props.transaction === false || props.history.location.pathname !== '/wallet';

    return (
        <QuickTransactButton
            disable={disable}
            lang={props.lang}
            onClick={handleClick}/>
    );
};

QuickTransact.propTypes = {
    history: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    showTransaction: PropTypes.func.isRequired,
    tabValue: PropTypes.number.isRequired,
    transaction: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.wallet.tabValue,
        transaction: state.wallet.transactions.display,
    };
};

const actionsToProps = {
    showTransaction,
    setTabValue,
};

export default withRouter(connect(stateToProps, actionsToProps)(QuickTransact));
