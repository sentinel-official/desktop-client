import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        loading: true
    };

    componentDidMount() {
        const loader = document.querySelector(".loader-container");
        if (loader) {
            loader.remove();
            this.setState({ loading: false });
        }
    }


    // Use the Below commented code to test the loading screen. Before doing so comment out the componentDidMount method above

    // componentDidMount() {
    //     this.fakeRequest().then(() => {
    //         const el = document.querySelector(".loader-container");
    //         if (el) {
    //             el.remove();  // removing the spinner element
    //             this.setState({ loading: false }); // showing the app
    //         }
    //     });
    // }

    // fakeRequest = () => {
    //     return new Promise(resolve => setTimeout(() => resolve(), 2500));
    // };


    render() {
        if (this.state.loading)
            return null;

        return (
            <div className="App">
            </div>
        );
    }
}




// const App = () => {
//     return (
//         <div className="App">
//         </div>
//     );
// };

export default App;
