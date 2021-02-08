import Lodash from 'lodash';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../../components/TextBox';

const FromName = ({
    items,
    value,
}) => {
    const item = Lodash.find(items, ['address', value]);

    return (
        <TextBox
            className="account-name"
            value={item.description.moniker}
        />
    );
};

FromName.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
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
        value: state.transactions.redelegate.from.value,
    };
};

export default connect(stateToProps)(FromName);
