import React from 'react';
import SelectField from '../../../components/SelectField';

const SelectValidator = () => {
    const list = [
        'Forble',
        'Google',
    ];
    return (
        <SelectField
            className="form-control"
            list={list}
        />
    );
};

export default SelectValidator;
