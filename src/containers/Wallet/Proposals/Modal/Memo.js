import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextArea from '../../../../components/TextArea';

const Memo = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            error={props.input.error}
            name="Memo"
            placeholder="Enter Memo"
            required={true}
            rows={3}
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Memo.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default connect()(Memo);
