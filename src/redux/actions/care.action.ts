import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import { ICare } from 'utils/interfaces/care.interface';

export enum GetPatientsByDate {
  GET_PATIENTS_BY_DATE_REQ = 'GET_PATIENTS_BY_DATE_REQ',
  GET_PATIENTS_BY_DATE_SUCCESS = 'GET_PATIENTS_BY_DATE_SUCCESS',
  GET_PATIENTS_BY_DATE_FAILURE = 'GET_PATIENTS_BY_DATE_FAILURE',
}

export const getPatientsByDate =
  (date: Date, doctorId: number) => (dispatch: Dispatch) =>
    dispatchApi(dispatch, {
      types: Object.keys(GetPatientsByDate),
      method: 'get',
      endpoint: `/cares/filter`,
      body: {
        params: { date, doctorId },
      },
    });
export enum GetAllPatients {
  GET_ALL_PATIENTS_REQ = 'GET_ALL_PATIENTS_REQ',
  GET_ALL_PATIENTS_SUCCESS = 'GET_ALL_PATIENTS_SUCCESS',
  GET_ALL_PATIENTS_FAILURE = 'GET_ALL_PATIENTS_FAILURE',
}
export const getAllPatientsCount =
  (doctorId: number, statusPatient?: string) =>
  (dispatch: Dispatch): Promise<number> =>
    dispatchApi(dispatch, {
      types: Object.keys(GetPatientsByDate),
      method: 'get',
      endpoint: `/cares`,
      body: {
        params: { doctorId, statusPatient },
      },
    });
