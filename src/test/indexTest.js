import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import 'modern-normalize/modern-normalize.css';
import './styles/index.css';
import './styles/global.module.css';

import { Provider } from 'react-redux';
import store from './redux/storeTest';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
