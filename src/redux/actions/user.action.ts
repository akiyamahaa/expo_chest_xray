import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import {
  ILogin,
  ILoginResponse,
  ILogoutRequest,
  ILogoutResponse,
} from 'utils/interfaces/auth.interface';

export enum LogInKeys {
  LOG_IN_REQ = 'LOG_IN_REQ',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
}

export const login =
  (userData: ILogin) =>
  (dispatch: Dispatch): Promise<ILoginResponse> =>
    dispatchApi(dispatch, {
      types: Object.keys(LogInKeys),
      method: 'post',
      endpoint: '/auth/login',
      body: {
        data: userData,
      },
    });

export enum LogOutKeys {
  LOG_OUT_REQ = 'LOG_OUT_REQ',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',
}

export const logout =
  (logoutData: ILogoutRequest) =>
  (dispatch: Dispatch): Promise<ILogoutResponse> =>
    dispatchApi(dispatch, {
      types: Object.keys(LogOutKeys),
      method: 'post',
      endpoint: '/auth/logout',
      body: {
        data: logoutData,
      },
    });
