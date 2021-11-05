import { AnyAction } from 'redux';
import { ErrorKeys } from 'redux/actions/error.action';

export interface IErrorState {
  messages: string;
}

const initial = {
  messages: '',
};

export default function errorReducer(
  state: IErrorState = initial,
  action: AnyAction
): IErrorState {
  switch (action.type) {
    case ErrorKeys.SET_ERROR: {
      const { messages } = action.payload;
      return { messages };
    }
    case ErrorKeys.CLEAR_ERROR: {
      return state;
    }
    default:
      return state;
  }
}
