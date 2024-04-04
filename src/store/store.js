import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redusers/rootReducer';
import { compose, applyMiddleware } from 'redux';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

export default configureStore({
    reducer: rootReducer, 
    middleware: getDefaultMiddleware => getDefaultMiddleware ({
      thunk: composeEnhancers(applyMiddleware())
    })  
});