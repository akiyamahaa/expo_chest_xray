import { AnyAction } from 'redux';
import { XrayDiagnosisStatusKeys } from 'redux/actions/xrayDiagnosis.action';

export interface IXrayDiagnosisState {
  isGetNewStatus: boolean;
}

const initial: IXrayDiagnosisState = {
  isGetNewStatus: false,
};

export default function xrayDiagnosisReducer(
  state: IXrayDiagnosisState = initial,
  action: AnyAction
): IXrayDiagnosisState {
  switch (action.type) {
    case XrayDiagnosisStatusKeys.SET_STATUS: {
      return { isGetNewStatus: !state.isGetNewStatus };
    }
    default:
      return state;
  }
}
