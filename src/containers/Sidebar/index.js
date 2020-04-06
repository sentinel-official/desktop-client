import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSidebarDrawer, updateSidebarContent } from '../../actions/sidebar';
import sentinelText from '../../assets/sentinel_full.png';
import sentinelLogo from '../../assets/sentinel_icon.png';
import ExpansionPanel from './ExpansionPanel';
import './index.css';

class Sidebar extends Component {
    constructor (props) {
        super(props);
        this.handleSideBarDisplay = this.handleSideBarDisplay.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    componentDidMount () {
        this.handleSideBarDisplay();
    }

    componentDidUpdate (pp, ps, ss) {
        if (pp.location.pathname !== this.props.location.pathname) {
            this.handleSideBarDisplay();
        }
    }

    handleSideBarDisplay () {
        let sideBar = true;
        switch (this.props.location.pathname) {
        case '/':
        case '/createAccount':
            sideBar = false;
            break;
        default:
            sideBar = true;
            break;
        }

        this.props.updateSidebarContent(sideBar);
    }

    handleHome () {
        if (this.props.url !== '/dashboard') {
            this.props.history.push({
                pathname: '/dashboard',
            });
        }
    }

    render () {
        return (
            <div className={'scroll_bar_div side_bar ' + (this.props.open ? 'side_bar_open' : '')}>
                <Button
                    aria-label="Open drawer"
                    className="toggle_button"
                    color="inherit"
                    onClick={this.props.onClick}>
                    <Menu/>
                </Button>
                <Button className="logo_section" onClick={this.handleHome}>
                    <img
                        alt="sentinel logo"
                        src={sentinelLogo}/>
                    <div className="hover_side_bar logo_full_div">
                        <img
                            alt="sentinel text"
                            className="sentinel_text_img"
                            src={sentinelText}/>
                        <p className="version_text">Desktop v2.0</p>
                    </div>
                </Button>
                {this.props.showContent
                    ? <ExpansionPanel/>
                    : ''
                }
            </div>
        );
    }
}

Sidebar.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    showContent: PropTypes.bool.isRequired,
    updateSidebarContent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    url: PropTypes.string,
};

const stateToProps = (state) => {
    return {
        url: state.sidebar.tab.url,
        open: state.sidebar.drawer,
        showContent: state.sidebar.showContent,
    };
};

const actionToProps = {
    onClick: toggleSidebarDrawer,
    updateSidebarContent,
};

export default withRouter(connect(stateToProps, actionToProps)(Sidebar));
