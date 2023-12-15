import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './input.css';

import App from './App';
import WhoisLookup from './WhoisLookup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <WhoisLookup />

  </React.StrictMode>
);
