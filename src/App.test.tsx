import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux';

test('renders Abris Demo', () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
  const tmElement = screen.getByText(/Abris Demo/i);
  expect(tmElement).toBeInTheDocument();
});
