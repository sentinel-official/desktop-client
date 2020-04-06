import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import variables from '../../dummy/variables';
import './index.css';
import TransactionTabs from './Tabs';

const Transactions = (props) => {
    return (
        <div className="transactions">
            <div className="heading_section">
                <p className="main_headings">{variables[props.lang].transactions}</p>
            </div>
            <div className="content_section card">
                <TransactionTabs/>
            </div>
        </div>
    );
};

Transactions.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(Transactions);
