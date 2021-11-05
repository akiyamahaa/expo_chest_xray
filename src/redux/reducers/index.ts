import { combineReducers } from 'redux';
import countingReducer from './counting.reducer';
import errorReducer from './error.reducer';
import userReducer from './user.reducer';

const reducers = {
  counting: countingReducer,
  user: userReducer,
  error: errorReducer,
};

export default combineReducers(reducers);
