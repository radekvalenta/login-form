import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import configureStore from './store/configureStore';

import TemplateDefault from './components/TemplateDefault';

const STORE = configureStore();

//  JUST FOR DEV!!!
STORE.subscribe(() => {
  console.log('Store changed: ', STORE.getState());
});

render(
  <Provider store={STORE}>
    <TemplateDefault />
  </Provider>, document.getElementById('app')
);
