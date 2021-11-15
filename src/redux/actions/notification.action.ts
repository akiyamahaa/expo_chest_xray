import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import { IUpdateNoti } from 'utils/interfaces/notification.interface';

export enum GetNotificationByDoctorKeys {
  GET_NOTIFICATION_REQ = 'GET_NOTIFICATION_REQ',
  GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS',
  GET_NOTIFICATION_FAILURE = 'GET_NOTIFICATION_FAILURE',
}

export const getNotificationById = (doctorId: number) => (dispatch: Dispatch) =>
  dispatchApi(dispatch, {
    types: Object.keys(GetNotificationByDoctorKeys),
    method: 'get',
    endpoint: `/notifications`,
    body: {
      params: doctorId,
    },
  });

export enum GetCountUnseenKeys {
  GET_COUNT_UNSEEN_REQ = 'GET_COUNT_UNSEEN_REQ',
  GET_COUNT_UNSEEN_SUCCESS = 'GET_COUNT_UNSEEN_SUCCESS',
  GET_COUNT_UNSEEN_FAILURE = 'GET_COUNT_UNSEEN_FAILURE',
}

export const getCountUnseen = (doctorId: number) => (dispatch: Dispatch) =>
  dispatchApi(dispatch, {
    types: Object.keys(GetNotificationByDoctorKeys),
    method: 'get',
    endpoint: `/notifications/unseen`,
    body: {
      params: doctorId,
    },
  });

export enum UpdateNotiKeys {
  UPDATE_NOTIFICATION_REQ = 'UPDATE_NOTIFICATION_REQ',
  UPDATE_NOTIFICATION_SUCCESS = 'UPDATE_NOTIFICATION_SUCCESS',
  UPDATE_NOTIFICATION_FAILURE = 'UPDATE_NOTIFICATION_FAILURE',
}

export const updateNotificationById =
  (notiData: IUpdateNoti, notiId: number) => (dispatch: Dispatch) =>
    dispatchApi(dispatch, {
      types: Object.keys(GetNotificationByDoctorKeys),
      method: 'put',
      endpoint: `/notifications/${notiId}`,
      body: {
        data: notiData,
      },
    });
