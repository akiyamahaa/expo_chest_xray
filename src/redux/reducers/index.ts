import { combineReducers } from 'redux';
import countingReducer from './counting.reducer';
import errorReducer from './error.reducer';
import loadingReducer from './loading.reducer';
import userReducer from './user.reducer';
import xrayDiagnosisReducer from './xrayDiagnosis.reducer';

const reducers = {
  counting: countingReducer,
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
  xrayDiagnosis: xrayDiagnosisReducer,
};

export default combineReducers(reducers);
