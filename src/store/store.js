
import React,{ useState, useEffect } from "react";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import AsyncStorage from '@react-native-community/async-storage';

import home from "./reducers/home";

import my from "./reducers/my";
import common from "./reducers/common";
import search from "./reducers/search";


const logger = createLogger();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null,
  whitelist: ["search"]
};

const reducers = combineReducers({  home, my,  common ,search});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

export function StoreProvider(props){
  
  const [persistIsFinish, setPersistIsFinish] = useState(true);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5)
    persistStore(store, {}, () => {
      setPersistIsFinish(true );
    });
  },[])


    if (!persistIsFinish) return null;
    return <Provider store={store}>{props.children}</Provider>;
  
}

export default store;
