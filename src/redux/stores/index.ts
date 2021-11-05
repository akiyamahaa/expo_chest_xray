import { applyMiddleware, compose, createStore } from 'redux';
import reducers from 'redux/reducers';
import thunk from 'redux-thunk';
import apiMiddleware from 'redux/middleware/api';

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, apiMiddleware))
);
export default store;

export type RootState = ReturnType<typeof store.getState>
