// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);// filepath: src/index.js
const apiUrl = process.env.REACT_APP_API_URL;
console.log('API URL:', apiUrl);

// ...código existente...