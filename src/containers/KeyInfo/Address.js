import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../components/TextBox';

const Address = (props) => {
    return (
        <TextBox
            className="value"
            value={props.value}
        />
    );
};

Address.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.info.address,
    };
};

export default connect(stateToProps)(Address);
