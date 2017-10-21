import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import store from './stores/AppStore'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
