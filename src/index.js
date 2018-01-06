import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './data/store';
import {Provider} from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

window.dispatch = store.dispatch;


//#039BE5

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
