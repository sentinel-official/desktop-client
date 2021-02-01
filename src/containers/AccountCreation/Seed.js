import React from 'react';
import TextArea from '../../components/TextArea';

const Seed = () => {
    const onChange = (value) => {
        console.log(value, 'in test');
    };
    return (
        <TextArea
            className="form-control seed-text-field"
            name="Seed"
            placeholder="Enter Seed"
            required={true}
            rows={3}
            value={''}
            onChange={onChange}
        />
    );
};

export default Seed;
