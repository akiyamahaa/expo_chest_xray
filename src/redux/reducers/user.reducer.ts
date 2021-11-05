import { AnyAction } from 'redux';
import { LogInKeys, LogOutKeys } from 'redux/actions/user.action';
import { IDoctor } from 'utils/interfaces/doctor.interface';

export interface IUserState extends IDoctor {}

const initial = {
  id: 0,
  username: '',
  password: '',
  fullname: '',
  phone: '',
  position: '',
  token: '',
};

export default function userReducer(
  state: IUserState = initial,
  action: AnyAction
): IUserState {
  switch (action.type) {
    case LogInKeys.LOG_IN_SUCCESS: {
      const { findDoctor, token } = action.payload;
      const newObj = {
        ...findDoctor,
        token,
      };
      return { ...newObj };
    }
    case LogOutKeys.LOG_OUT_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
}
