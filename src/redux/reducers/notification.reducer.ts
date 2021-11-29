import { AnyAction } from 'redux';
import {
  GetCountUnseenKeys,
  UpdateNotiKeys,
} from 'redux/actions/notification.action';

export interface INotificationState {
  unseen: number;
}
const initial = {
  unseen: 0,
};

export default function notificationReducer(
  state: INotificationState = initial,
  action: AnyAction
): INotificationState {
  switch (action.type) {
    case GetCountUnseenKeys.GET_COUNT_UNSEEN_SUCCESS: {
      return { unseen: action.payload };
    }
    case UpdateNotiKeys.UPDATE_NOTIFICATION_SUCCESS: {
      return { unseen: state.unseen - 1 };
    }
    default:
      return state;
  }
}
