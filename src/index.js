import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);

