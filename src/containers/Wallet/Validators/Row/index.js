import React from 'react';
import Logo from '../../../../assets/Logo.svg';
import Image from '../../../../components/Image';
import Delegate from './Delegate';
const Row = (item, index) => {
    return (
        <tr key={index}>
            <td className="flex-center">
                <div className="serial">
                    {index}
                </div>
                <Image
                    alt="moniker-image"
                    className="moniker-image"
                    src={Logo}
                />
            </td>
            <td>
                {item.label}
            </td>
            <td>
                1,190,255 (6.62%)
            </td>
            <td>
                94.04%
            </td>
            <td>
                10.00%
            </td>
            <td>
                100.00%
            </td>
            <td>
                <Delegate/>
            </td>
        </tr>
    );
};

Row.propTypes = {};

export default Row;
