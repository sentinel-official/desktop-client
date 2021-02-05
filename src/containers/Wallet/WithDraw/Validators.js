import React from 'react';
import SelectField from '../../../components/SelectField';

const Validators = () => {
    const list = [
        'Forble',
        'Google',
    ];
    const onChange = () => {

    };

    return (
        <SelectField
            className="form-control"
            list={list}
            onChange={onChange}
        />
    );
};

export default Validators;
