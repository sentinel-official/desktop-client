import React from 'react';
import TextArea from '../../../../../components/TextArea';

const Memo = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            name="Memo"
            placeholder="Enter Memo"
            required={true}
            rows={3}
            value=""
            onChange={onChange}
        />
    );
};

export default Memo;
