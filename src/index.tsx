import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

export * from './views';

function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    return worker.start();
  }
  return Promise.resolve();
}

prepare().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});