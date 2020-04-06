import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchActiveValidatorsList,
    fetchInActiveValidatorsList,
    setButtonSwitch,
    setValidatorsListFetch,
} from '../../../../../../actions/staking';
import variables from '../../../../../../dummy/variables';
import ActiveButton from './ActiveButton';
import DelegateDialog from './DelegateDialog';
import InActiveButton from './InActiveButton';
import './index.css';
import Search from './Search';
import SuccessDialog from './SuccessDialog';
import ValidatorsListTable from './Table';

class Delegate extends Component {
    componentDidMount () {
        if (this.props.activeList &&
            this.props.activeAccount.address &&
            this.props.activeValidators.list &&
            this.props.activeValidators.list.length === 0) {
            this.props.setButtonSwitch(true);
            this.props.fetchActiveList();
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.validatorListFetch) {
            this.props.setValidatorsListFetch();
            this.props.setButtonSwitch(true);
            if (this.props.activeList) {
                this.props.fetchActiveList();
            } else {
                this.props.fetchInActiveList();
            }
        }

        if (this.props.activeAccount.address && pp.activeAccount.address !== this.props.activeAccount.address) {
            this.props.setButtonSwitch(true);
            if (this.props.activeList) {
                this.props.fetchActiveList();
            } else {
                this.props.fetchInActiveList();
            }
        }
    }

    render () {
        return (
            <div className="delegate">
                <div className="filters">
                    <p className="heading_text">{variables[this.props.lang].validators_list}</p>
                    <ActiveButton/>
                    <InActiveButton/>
                    <Search/>
                </div>
                <ValidatorsListTable/>
                <DelegateDialog/>
                <SuccessDialog/>
            </div>
        );
    }
}

Delegate.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    activeList: PropTypes.bool.isRequired,
    activeValidators: PropTypes.object.isRequired,
    fetchActiveList: PropTypes.func.isRequired,
    fetchInActiveList: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setButtonSwitch: PropTypes.func.isRequired,
    setValidatorsListFetch: PropTypes.func.isRequired,
    validatorListFetch: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        activeList: state.staking.delegate.activeList,
        validatorListFetch: state.staking.validatorListFetch,
        activeValidators: state.staking.delegate.activeValidatorsList,
        lang: state.language,
    };
};

const actionsToProps = {
    fetchActiveList: fetchActiveValidatorsList,
    fetchInActiveList: fetchInActiveValidatorsList,
    setValidatorsListFetch,
    setButtonSwitch,
};

export default connect(stateToProps, actionsToProps)(Delegate);
