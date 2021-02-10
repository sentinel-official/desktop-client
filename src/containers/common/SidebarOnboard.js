import Image from '../../components/Image';
import Logo from '../../assets/Logo.svg';
import React from 'react';
import TextBox from '../../components/TextBox';

const SidebarOnboard = () => {
    return (
        <div className="side-bar">
            <Image
                alt="Logo"
                className="side-bar-logo"
                src={Logo}
            />
            <div className="side-bar-bottom">
                <TextBox
                    className="side-bar-text"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                />
                <TextBox
                    className="side-bar-text-logo"
                    value="SENTINEL"
                />
                <TextBox
                    className="side-bar-version-text"
                    value={process.env.REACT_APP_VERSION}
                />
            </div>
        </div>
    );
};

export default SidebarOnboard;
