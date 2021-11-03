import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PatientStackParamList = {
  PatientScreen: undefined;
  PatientCreate: undefined;
  PatientDetail: undefined;
};

export type PatientStackProps = NativeStackScreenProps<PatientStackParamList,'PatientScreen'>
