import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import variables from '../../dummy/variables';
import Icon from '../Icon';
import './index.css';

class GoBack extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction (event) {
        if (event.keyCode === 27) {
            this.handleClick();
        }
    }

    componentDidMount () {
        document.addEventListener('keydown', this.escFunction, false);
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this.escFunction, false);
    }

    handleClick () {
        if (Number.isInteger(this.props.value)) {
            this.props.onClick(this.props.value);
        } else {
            this.props.onClick();
        }
    }

    render () {
        return (
            <div className="go_back" onClick={this.handleClick}>
                <Icon
                    className="back"
                    icon="back"/>
                {variables[this.props.lang].go_back}
            </div>
        );
    }
}

GoBack.propTypes = {
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number,
};

export default GoBack;
