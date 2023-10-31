import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import logger from "redux-logger";

import { reducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
