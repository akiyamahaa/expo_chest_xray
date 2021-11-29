import { combineReducers } from 'redux';
import countingReducer from './counting.reducer';
import errorReducer from './error.reducer';
import loadingReducer from './loading.reducer';
import notificationReducer from './notification.reducer';
import userReducer from './user.reducer';
import xrayDiagnosisReducer from './xrayDiagnosis.reducer';

const reducers = {
  counting: countingReducer,
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
  xrayDiagnosis: xrayDiagnosisReducer,
  notification: notificationReducer,
};

export default combineReducers(reducers);
