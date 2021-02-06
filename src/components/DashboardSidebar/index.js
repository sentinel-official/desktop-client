import * as PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import './index.css';
import TextBox from '../TextBox';

const DashboardSidebar = ({
    config,
}) => {
    return (
        <div>
            <ul className="list-group">
                {
                    config.options.map((item, index) => (
                        <NavLink
                            key={index}
                            className={window.location.pathname === item.url ? 'active' : ''} to={item.url}>
                            <Icon
                                className="icon"
                                icon={item.icon}
                            />
                            <TextBox className="nav-link-text" value={item.name}/>
                        </NavLink>
                    ))
                }
            </ul>
        </div>
    );
};

DashboardSidebar.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        icon: PropTypes.string.isRequired,
    }).isRequired,
};

export default DashboardSidebar;
