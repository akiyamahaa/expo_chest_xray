import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PatientCreateForm from 'screens/patient-create/PatientCreateForm';
import PatientDetail from 'screens/patient-detail/PatientDetail';
import PatientScreen from 'screens/patient/PatientScreen';
import { PatientStackParamList } from './interface';

interface Props {}

const Stack = createNativeStackNavigator<PatientStackParamList>();

const PatientStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PatientScreen"
    >
      <Stack.Screen name="PatientScreen" component={PatientScreen} />
      <Stack.Screen name="PatientCreate" component={PatientCreateForm} />
      <Stack.Screen name="PatientDetail" component={PatientDetail} />
    </Stack.Navigator>
  );
};

export default PatientStack;
