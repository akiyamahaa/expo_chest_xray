import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/core';
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

export type TabParamList = {
  Home: undefined;
  Patient: NavigatorScreenParams<PatientStackParamList>;
  Notification: undefined;
  Profile: undefined;
};

export type TabStackProps = BottomTabScreenProps<TabParamList>;
