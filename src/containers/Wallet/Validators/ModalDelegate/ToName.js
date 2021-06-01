import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ToName = ({
    items,
    value,
}) => {
    const item = Lodash.find(items, ['operator_address', value]);

    return (
        <TextBox
            className="account-name"
            value={item.description.moniker}
        />
    );
};

ToName.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            operator_address: PropTypes.string.isRequired,
            description: PropTypes.shape({
                moniker: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        items: state.validators.items,
        value: state.transactions.delegate.to.value,
    };
};

export default connect(stateToProps)(ToName);
