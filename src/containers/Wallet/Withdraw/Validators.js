import React from 'react';
import SelectField from '../../../components/SelectField';

const Validators = () => {
    const list = [
        { value: 'Forbole', address: 'cosmosvd6f5g4dg6dfg74eg12fg784df40yrte3' },
        { value: 'Bit Cat', address: 'cosmosvd6f5g4dg6dfg74eg12fg784df40yrte3' },
        { value: 'Bit Cat', address: 'cosmosvd6f5g4dg6dfg74eg12fg784df40yrte3' },
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
