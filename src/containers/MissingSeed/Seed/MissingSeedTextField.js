import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSeedValues } from '../../../actions/account';
import TextField from '../../../components/TextField';

class MissingSeedTextField extends Component {
    constructor (props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange (value) {
        const item = this.props.value;
        item['text' + this.props.index] = value;
        this.props.onChange({ ...item });
    }

    render () {
        return (
            <TextField
                id={'missing_seed_text_field' + this.props.index}
                name={'missingSeedText' + this.props.index}
                type="text"
                value={this.props.value['text' + this.props.index]}
                onChange={this.onChange}/>
        );
    }
}

MissingSeedTextField.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.account.new.seedValues,
    };
};

const actionsToProps = {
    onChange: setSeedValues,
};

export default connect(stateToProps, actionsToProps)(MissingSeedTextField);
