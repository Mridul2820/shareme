import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();