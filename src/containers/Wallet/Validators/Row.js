import React from 'react';
import Image from '../../../components/Image';
import Logo from '../../../assets/Logo.svg';

const Row = (item, index) => {
    return (
        <tr key={index}>
            <td>
                <Image
                    alt="moniker-image"
                    className="moniker-image"
                    src={Logo}
                />
                {item}
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
                <span>Delegate</span>
            </td>
        </tr>
    );
};

export default Row;
