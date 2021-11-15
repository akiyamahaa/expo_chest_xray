export enum XrayDiagnosisStatusKeys {
  SET_STATUS = 'SET_STATUS',
}
export const setDiagnosisStatus = () => ({
  type: XrayDiagnosisStatusKeys.SET_STATUS,
});

