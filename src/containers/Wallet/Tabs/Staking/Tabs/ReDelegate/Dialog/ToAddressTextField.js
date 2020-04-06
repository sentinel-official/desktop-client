import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToAddress } from '../../../../../../../actions/reDelegate';
import { fetchValidatorsList } from '../../../../../../../actions/staking';
import AutoComplete from '../../../../../../../components/AutoComplete';
import variables from '../../../../../../../dummy/variables';

class AmountTextField extends Component {
    constructor (props) {
        super(props);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount () {
        if (this.props.willFetch) {
            this.fetch();
        }

        if (this.props.items.length) {
            return;
        }

        this.fetch();
    }

    fetch () {
        if (this.props.inProgress) {
            return;
        }

        this.props.fetch();
    }

    render () {
        return (
            <AutoComplete
                id="re_delegate_to_address_text_field"
                name="toAddress"
                options={this.props.items}
                placeholder={variables[this.props.lang].enter_address}
                type="text"
                onChange={this.props.onChange}/>
        );
    }
}

AmountTextField.propTypes = {
    fetch: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    willFetch: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.staking.validatorsList.inProgress,
        items: state.staking.validatorsList.list,
        willFetch: state.staking.validatorsList.fetch,
        lang: state.language,
    };
};

const actionsToProps = {
    onChange: setToAddress,
    fetch: fetchValidatorsList,
};

export default connect(stateToProps, actionsToProps)(AmountTextField);
