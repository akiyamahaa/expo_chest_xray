import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';

// export enum UploadFileKeys {
//   UPLOAD_FILE_REQ = 'UPLOAD_FILE_REQ',
//   UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
//   UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE',
// }

// export const uploadXrayImage =
//   (patientId: number, image: any) =>
//   (dispatch: Dispatch): Promise<any> =>
//     dispatchApi(dispatch, {
//       types: Object.keys(UploadFileKeys),
//       method: 'post',
//       endpoint: '/uploads',
//       body: {
//         params: { patientId, image },
//       },
//     });

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
