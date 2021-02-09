import * as PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../components/Icon';
import TextBox from '../../components/TextBox';

const options = [
    {
        pathname: '/dashboard/wallet',
        icon: 'wallet',
        name: 'Wallet',
    },
];

const SidebarDashboard = ({
    location,
}) => {
    return (
        <ul className="list-group">
            {
                options.map((item, index) => (
                    <NavLink
                        key={index}
                        className={location.pathname === item.pathname ? 'active' : ''}
                        to={item.pathname}>
                        <Icon
                            className="icon"
                            icon={item.icon}
                        />
                        <TextBox
                            className="nav-link-text"
                            value={item.name}
                        />
                    </NavLink>
                ))
            }
        </ul>
    );
};

SidebarDashboard.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default SidebarDashboard;
