import React from 'react';
import Switch from '../../../../components/Switch';

const SelectKey = () => {
    const onChange = (evt) => {
        console.log(evt.target.checked);
    };
    return (
        <Switch checked={true} className="switch" id="customSwitch" label="select" onChange={onChange}/>
    );
};

export default SelectKey;
