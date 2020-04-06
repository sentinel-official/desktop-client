import React from 'react';
import './app.css';
import SideBar from './containers/Sidebar';
import Snackbar from './containers/Snackbar';
import Routes from './Router';

const App = () => {
    return (
        <div className="sentinel">
            <div className="main_content">
                <SideBar/>
                <div className="content_div scroll_bar_div">
                    <Routes/>
                </div>
                <Snackbar/>
            </div>
        </div>
    );
};

export default App;
