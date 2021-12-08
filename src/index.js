import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import 'modern-normalize/modern-normalize.css';
import './styles/index.css';
import './styles/global.module.css';
// import './styles/variables.module.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
