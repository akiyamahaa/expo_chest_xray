import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import { ICreateDevice } from 'utils/interfaces/device.interface';

export enum CreateDeviceTokenKeys {
  CREATE_DEVICE_TOKEN_REQ = 'CREATE_DEVICE_TOKEN_REQ',
  CREATE_DEVICE_TOKEN_SUCCESS = 'CREATE_DEVICE_TOKEN_SUCCESS',
  CREATE_DEVICE_TOKEN_FAILURE = 'CREATE_DEVICE_TOKEN_FAILURE',
}

export const createDevice =
  (deviceData: ICreateDevice) => (dispatch: Dispatch) =>
    dispatchApi(dispatch, {
      types: Object.keys(CreateDeviceTokenKeys),
      method: 'post',
      endpoint: `/devices`,
      body: {
        data: deviceData,
      },
    });
