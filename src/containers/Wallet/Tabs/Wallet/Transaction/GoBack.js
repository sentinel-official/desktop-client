import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showWallet } from '../../../../../actions/wallet';
import GoBack from '../../../../../components/GoBack';

const BackToWallet = (props) => {
    return (
        <GoBack lang={props.lang} onClick={props.showWallet}/>
    );
};

BackToWallet.propTypes = {
    lang: PropTypes.string.isRequired,
    showWallet: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionsToProps = {
    showWallet,
};

export default connect(stateToProps, actionsToProps)(BackToWallet);
