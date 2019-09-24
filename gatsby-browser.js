import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import 'react-vis/dist/style.css'


export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    { element }
  </Provider>
)
