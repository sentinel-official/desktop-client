import React from 'react';
import store from '../store';
import { connect } from 'react-redux'
import { loadApplication } from '../actions/applicationActions';


const mapStateToProps = function (state) {
    return {
        isLoading: state.application.isLoading
    }
}
class AppContainer extends React.Component {

    componentDidMount() {
        store.dispatch(loadApplication());
    }



    render() {

        if (this.props.isLoading)
            return null;

        return (
            <div className="App">
                MyApp
            </div>
        );
    }
}
export default connect(mapStateToProps)(AppContainer);