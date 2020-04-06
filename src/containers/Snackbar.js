import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideSnackbar, showSnackbar } from '../actions/snackbar';
import Snackbar from '../components/Snackbar';
import variables from '../dummy/variables';

class SnackbarMessage extends Component {
    componentDidUpdate (pp, ps, ss) {
        if (pp.errorCode !== this.props.errorCode && this.props.errorCode > 0) {
            const message = this.errorMessage();
            this.props.showSnackbar(message);
        }
    }

    errorMessage () {
        switch (this.props.errorCode) {
        case 1:
            return variables[this.props.lang]['ec_1'];
        case 2:
            return variables[this.props.lang]['ec_2'];
        case 3:
            return variables[this.props.lang]['ec_3'];
        case 4:
            return variables[this.props.lang]['ec_4'];
        case 5:
            return variables[this.props.lang]['ec_5'];
        case 6:
            return variables[this.props.lang]['ec_6'];
        case 7:
            return variables[this.props.lang]['ec_7'];
        case 8:
            return variables[this.props.lang]['ec_8'];
        case 9:
            return variables[this.props.lang]['ec_9'];
        case 10:
            return variables[this.props.lang]['ec_10'];
        case 11:
            return variables[this.props.lang]['ec_11'];
        case 12:
            switch (this.props.module) {
            case 'account':
                return variables[this.props.lang]['ec_12_account'];
            case 'config':
                return variables[this.props.lang]['ec_12_config'];
            case 'key':
                return variables[this.props.lang]['ec_12_key'];
            default:
                return variables[this.props.lang].failed;
            }
        case 13:
            switch (this.props.module) {
            case 'account':
                return variables[this.props.lang]['ec_13_account'];
            case 'config':
                return variables[this.props.lang]['ec_13_config'];
            case 'key':
                return variables[this.props.lang]['ec_14_key'];
            default:
                return variables[this.props.lang].failed;
            }
        case 14:
            switch (this.props.module) {
            case 'account':
                return variables[this.props.lang]['ec_14_account'];
            case 'key':
                return variables[this.props.lang]['ec_14_key'];
            default:
                return variables[this.props.lang].failed;
            }
        case 15:
            if (this.props.module === 'key') {
                return variables[this.props.lang]['ec_15_key'];
            } else {
                return variables[this.props.lang].failed;
            }
        case 16:
            if (this.props.module === 'key') {
                return variables[this.props.lang]['ec_16_key'];
            } else {
                return variables[this.props.lang].failed;
            }
        case 17:
            if (this.props.module === 'key') {
                return variables[this.props.lang]['ec_17_key'];
            } else {
                return variables[this.props.lang].failed;
            }
        default:
            return variables[this.props.lang].failed;
        }
    }

    render () {
        return (
            <Snackbar
                message={this.props.message}
                open={this.props.open}
                onClose={this.props.onClose}/>
        );
    }
}

SnackbarMessage.propTypes = {
    errorCode: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    showSnackbar: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        errorCode: state.snackbar.error.code,
        open: state.snackbar.snackbar.open,
        message: state.snackbar.snackbar.message,
        module: state.snackbar.error.module,
    };
};

const actionsToProps = {
    onClose: hideSnackbar,
    showSnackbar,
};

export default connect(stateToProps, actionsToProps)(SnackbarMessage);
