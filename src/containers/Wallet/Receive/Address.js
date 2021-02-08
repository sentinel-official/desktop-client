import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextBox from '../../../components/TextBox';
import { encodeToBech32 } from '../../../utils/bech32';

const Address = ({
    items,
    index,
}) => {
    const value = encodeToBech32(items[index]?.address, 'sent');

    return (
        <div className="receive-address">
            <TextBox
                className=""
                value={value}
            />
        </div>
    );
};

Address.propTypes = {
    index: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        index: state.keys.index,
        items: state.keys.items,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(Address);
