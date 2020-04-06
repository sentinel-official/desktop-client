import { Button, Paper } from '@material-ui/core';
import ClassNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSidebarSelectedTab } from '../../../actions/sidebar';
import toggleIcon from '../../../assets/toggle.png';
import Icon from '../../../components/Icon';
import './index.css';
import { tabs } from './tabs';

class ExpansionPanel extends React.Component {
    componentDidMount () {
        const { pathname } = this.props.location;
        if (pathname !== '/') {
            this.props.onClick('/' + pathname.split('/')[1]);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        const { pathname } = this.props.location;
        if (pp.location !== this.props.location) {
            this.props.onClick('/' + pathname.split('/')[1]);
        }
    }

    content (tabs) {
        return (
            tabs.map((tab, index) => {
                return (
                    <Button
                        key={index}
                        className="tab active_tab"
                        onClick={() => this.childRoute(tab)}>
                        <p className="hover_side_bar label">
                            {tab.label}
                        </p>
                    </Button>
                );
            })
        );
    }

    tabExpanded (item, index) {
        return (
            <div key={index} className="expansion_tab">
                <Button
                    className={'collapse_tab tab ' +
                    (item.url === this.props.url ? 'active_tab ' : '') +
                    (this.props.index === index || item.url === this.props.url ? 'expand_tab ' : '')}
                    onClick={() => this.actionCall(item, index)}>
                    <span className="collapse_button_left">
                        <Icon
                            className={item.icon}
                            icon={item.icon}/>
                        <p className="hover_side_bar label">{item.label}</p>
                        <span className="left_bar"/>
                    </span>
                    <span className="collapse_button_right">
                        <img
                            alt="toggle icon"
                            src={toggleIcon}/>
                    </span>
                </Button>
                <div
                    className={'expand_div ' +
                    (this.props.index === index || item.url === this.props.url ? 'expand_active' : '')}
                    style={{ height: (item.url === this.props.url || this.props.index === index) && item.content.length * 60 }}>
                    {this.content(item.content)}
                </div>
            </div>
        );
    }

    handleRoutes (item, index) {
        if (!item.content && item.url && item.url !== this.props.url) {
            this.childRoute(item);
        }

        this.actionCall(item, index);
    }

    childRoute (item) {
        this.props.history.push({
            pathname: item.url,
        });
    }

    actionCall (item, index) {
        if (index !== this.props.index) {
            this.props.onClick(item.url, index);
        }
    }

    tab (item, index) {
        return (
            item.content
                ? this.tabExpanded(item, index)
                : <Button
                    key={index}
                    className={
                        ClassNames('tab', item.url
                            ? item.url === this.props.url
                                ? 'active_tab'
                                : ''
                            : this.props.index === index
                                ? 'active_tab'
                                : '')}
                    onClick={() => this.handleRoutes(item, index)}>
                    <Icon
                        className={item.icon}
                        icon={item.icon}/>
                    <p className="hover_side_bar label">{item.label}</p>
                    <span className="left_bar"/>
                </Button>
        );
    }

    render () {
        return (
            <Paper className="side_bar_tabs">
                <div className="side_bar_tab_content">
                    {tabs.map((item, index) => this.tab(item, index))}
                </div>
            </Paper>
        );
    }
}

ExpansionPanel.propTypes = {
    history: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number,
    url: PropTypes.string,
};

const stateToProps = (state) => {
    return {
        url: state.sidebar.tab.url,
        index: state.sidebar.tab.index,
    };
};

const actionToProps = {
    onClick: setSidebarSelectedTab,
};

export default withRouter(connect(stateToProps, actionToProps)(ExpansionPanel));
