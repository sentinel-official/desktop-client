import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import variables from '../../../../../dummy/variables';
import './index.css';
import WalletCards from './WalletCards';

const MyWallets = (props) => {
    return (
        <div className="wallets">
            <p className="main_headings">{variables[props.lang].my_wallets}</p>
            <div className="content scroll_bar_div">
                <div className="cards_section">
                    <WalletCards/>
                </div>
                <span className="right_border"></span>
            </div>
        </div>
    );
};

MyWallets.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(MyWallets);
