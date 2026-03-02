// render App React element into the root DOM NODE

import React from 'react';  // creating view
import ReactDOM from 'react-dom/client';  // render UI in browser
import './index.css';
import App from './App';  // App component
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);




