import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import { ICreatePatient, IPatient } from 'utils/interfaces/patient.interface';

export enum CreateProfilePatientKeys {
  CREATE_PROFILE_PATIENT_REQ = 'CREATE_PROFILE_PATIENT_REQ',
  CREATE_PROFILE_PATIENT_SUCCESS = 'CREATE_PROFILE_PATIENT_SUCCESS',
  CREATE_PROFILE_PATIENT_FAILURE = 'CREATE_PROFILE_PATIENT_FAILURE',
}

export const createPatient =
  (patientData: ICreatePatient, doctorId: number) =>
  (dispatch: Dispatch): Promise<IPatient> =>
    dispatchApi(dispatch, {
      types: Object.keys(CreateProfilePatientKeys),
      method: 'post',
      endpoint: '/patients',
      body: {
        data: { patientData, doctorId },
      },
    });

export enum GetProfileByIdKeys {
  GET_PROFILE_BY_ID_REQ = 'GET_PROFILE_BY_ID_REQ',
  GET_PROFILE_BY_ID_SUCCESS = 'GET_PROFILE_BY_ID_SUCCESS',
  GET_PROFILE_BY_ID_FAILURE = 'GET_PROFILE_BY_ID_FAILURE',
}

export const getProfileById = (patientId: number) => (dispatch: Dispatch) =>
  dispatchApi(dispatch, {
    types: Object.keys(GetProfileByIdKeys),
    method: 'get',
    endpoint: `/patients/${patientId}`,
    body: {},
  });
