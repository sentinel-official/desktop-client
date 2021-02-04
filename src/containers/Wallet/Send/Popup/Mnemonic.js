import React from 'react';
import TextArea from '../../../../components/TextArea';

const Mnemonic = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            name="mnemonic"
            placeholder="Enter Fee"
            required={true}
            rows={3}
            value=""
            onChange={onChange}
        />
    );
};

export default Mnemonic;
