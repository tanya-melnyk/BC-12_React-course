import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

// const span = React.createElement("span", null, "Hello world");
// const title = React.createElement("h2", null, span);
// console.log(title);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
