import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Header = ({ columns }) => {
    return (
        <thead>
            <tr>
                {
                    columns.map((item, index) => (
                        <th key={index}>
                            {item.label}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
};

Header.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Header;
