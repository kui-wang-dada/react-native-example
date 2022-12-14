import React, { useState, useEffect } from 'react';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import AsyncStorage from '@react-native-community/async-storage';

import reducers from './reducers';

const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['search'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

export function StoreProvider(props) {
  const [persistIsFinish, setPersistIsFinish] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5);
    persistStore(store, {}, () => {
      setPersistIsFinish(true);
    });
  }, []);

  if (!persistIsFinish) {
    return null;
  }
  return <Provider store={store}>{props.children}</Provider>;
}

export default store;
