import { IDoctor } from './doctor.interface';

export interface DataStoredInToken {
  id?: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  findDoctor: IDoctor;
  token: string;
}

export interface ILogoutRequest extends IDoctor {}

export interface ILogoutResponse extends IDoctor {
  createdAt: string;
  updatedAt: string;
}
