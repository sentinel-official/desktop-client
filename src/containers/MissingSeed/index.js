import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setAccountCreationStep, showContinueButton } from '../../actions/account';
import { fetchKeys } from '../../actions/keys';
import variables from '../../dummy/variables';
import '../GeneratedSeed/index.css';
import ContinueButton from './ContinueButton';
import Seed from './Seed';

class MissingSeed extends Component {
    constructor (props) {
        super(props);
        this.handleContinue = this.handleContinue.bind(this);
        this.enable = this.enable.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount () {
        this.enable();
    }

    componentDidUpdate (pp, ps, ss) {
        if (pp.value !== this.props.value) {
            this.enable();
        }
    }

    handleKeyPress (event) {
        if (event.key === 'Enter' && this.props.enable) {
            this.handleContinue();
        }
    }

    handleContinue () {
        this.props.history.push({
            pathname: '/dashboard',
        });
        this.props.onChange(0);
        this.props.fetchKeys();
        localStorage.clear();
    }

    enable () {
        const seed = this.props.mnemonic.split(' ');
        let enable = true;
        const enableArray = this.props.index.map((value, index) => {
            return seed[value] === this.props.value['text' + (index + 1)];
        });
        enableArray.map((value) => {
            enable = enable && value;
            return enable;
        });
        if (this.props.enable !== enable) {
            this.props.showButton(enable);
        }
    }

    render () {
        return (
            <div className="wallet_seed">
                <form noValidate autoComplete="off" onKeyPress={this.handleKeyPress}>
                    <p className="heading_text">{variables[this.props.lang].wallet_successful}</p>
                    <Seed/>
                    <div className="button_div">
                        <ContinueButton onClick={this.handleContinue}/>
                    </div>
                </form>
            </div>
        );
    }
}

MissingSeed.propTypes = {
    enable: PropTypes.bool.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    index: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    showButton: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.account.new.missingSeedIndex,
        lang: state.language,
        mnemonic: state.account.new.mnemonic,
        value: state.account.new.seedValues,
        enable: state.account.new.enable,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
    showButton: showContinueButton,
    fetchKeys,
};

export default withRouter(connect(stateToProps, actionsToProps)(MissingSeed));
