import React from 'react';
import './index.css';
import App from './App';

// import ReactDOM from 'react-dom/client'; // react v18
import ReactDOM from 'react-dom';  // react v17

// react v 18
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <React.StrictMode>
//         <App />
//   </React.StrictMode>
// );

// react v 17
ReactDOM.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  document.getElementById('root')
);
