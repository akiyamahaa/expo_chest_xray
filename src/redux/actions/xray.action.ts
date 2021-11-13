import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';

export enum GetXrayInputKeys {
  GET_XRAY_INPUT_REQ = 'GET_XRAY_INPUT_REQ',
  GET_XRAY_INPUT_SUCCESS = 'GET_XRAY_INPUT_SUCCESS',
  GET_XRAY_INPUT_FAILURE = 'GET_XRAY_INPUT_FAILURE',
}

export const getXrayImage =
  (patientId: number) =>
  (dispatch: Dispatch): Promise<any> =>
    dispatchApi(dispatch, {
      types: Object.keys(GetXrayInputKeys),
      method: 'get',
      endpoint: '/uploads',
      body: {
        params: { patientId },
      },
    });

export enum GetXrayDiagnosisKeys {
  GET_XRAY_DIAGNOSIS_REQ = 'GET_XRAY_DIAGNOSIS_REQ',
  GET_XRAY_DIAGNOSIS_SUCCESS = 'GET_XRAY_DIAGNOSIS_SUCCESS',
  GET_XRAY_DIAGNOSIS_FAILURE = 'GET_XRAY_DIAGNOSIS_FAILURE',
}

export const getXrayDiagnosis =
  (xrayInputId: number) =>
  (dispatch: Dispatch): Promise<any> =>
    dispatchApi(dispatch, {
      types: Object.keys(GetXrayDiagnosisKeys),
      method: 'get',
      endpoint: '/xrayDiagnosis/getById',
      body: {
        params: { xrayInputId },
      },
    });
