import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import store from './store/reduxIndex';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);