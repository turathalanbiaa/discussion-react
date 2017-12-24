import React, {Component} from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import RouterPage from "./pages/RouterPage";

class App extends Component
{
    render()
    {
        return (
            <div className="App">
                <RouterPage/>
            </div>
        );
    }
}

export default App;
