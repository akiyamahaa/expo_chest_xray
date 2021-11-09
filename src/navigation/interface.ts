import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PatientStackParamList = {
  PatientScreen: undefined;
  PatientCreate: undefined;
  PatientDetail: { patientId: number };
};

export type PatientStackProps = NativeStackScreenProps<PatientStackParamList>;

export type RootStackParamList = {
  AuthStack: undefined;
  TabStack: undefined;
  Loading: undefined;
};

export type RootStackProps = NativeStackScreenProps<RootStackParamList>;
