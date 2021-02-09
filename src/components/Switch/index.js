import React from 'react';

const Switch = () => {
    return (
        <div className="custom-control custom-switch">
            <input className="custom-control-input" id="customSwitch1" type="checkbox" />
            <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
        </div>
    );
};

export default Switch;
