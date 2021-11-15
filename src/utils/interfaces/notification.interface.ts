export interface INotification {
  id: number;
  doctorId: number;
  patientId: number;
  content: string;
  status: string;
}

export interface IGetAllNoti {
  page?: number;
}

export interface IUpdateNoti {
  doctorId: number;
  patientId: number;
  content: string;
  status: string;
}

export enum NotiStatus {
  UNSEEN = 'UNSEEN',
  SEEN = 'SEEN',
}
