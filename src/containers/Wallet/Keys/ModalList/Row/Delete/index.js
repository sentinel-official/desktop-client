import Label from '../../../../../../components/Label';
import Password from './Password';
import React from 'react';
import Submit from './Submit';
import Typography from '@material-ui/core/Typography';
import ViewPassword from './ViewPassword';

const Delete = () => {
    return (
        <Typography
            component="div"
            gutterBottom={true}
            variant="h6">
            <div className="password-box">
                <div className="form-group">
                    <Label
                        className=""
                        label="Password"
                    />
                    <Password/>
                </div>
                <ViewPassword/>
            </div>
            <Submit/>
        </Typography>
    );
};

export default Delete;
