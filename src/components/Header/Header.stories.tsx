import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from 'index';
import Header from './Header';

const withProvider = (component: ReactElement) => (
  <Provider store={store}>{component}</Provider>
);

export default {
  title: 'Header',
  component: Header
};

export const Default = () => withProvider(<Header />);
