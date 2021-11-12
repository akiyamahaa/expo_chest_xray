import { AnyAction } from 'redux';
import { LoadingKeys } from 'redux/actions/loading.action';

export interface ILoadingState {
  isLoading: boolean;
}

const initial: ILoadingState = {
  isLoading: false,
};

export default function loadingReducer(
  state: ILoadingState = initial,
  action: AnyAction
): ILoadingState {
  switch (action.type) {
    case LoadingKeys.SET_LOADING: {
      return { isLoading: true };
    }
    case LoadingKeys.REMOVE_LOADING: {
      return { isLoading: false };
    }
    default:
      return state;
  }
}
