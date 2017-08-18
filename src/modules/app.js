import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Userform from './userform';
import license from './license';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            license
        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <div>
                <Header license={this.state.license} />
                <div className="g-wrap">
                    <Userform />
                </div>
            </div>
        );
    }
}

export default App;