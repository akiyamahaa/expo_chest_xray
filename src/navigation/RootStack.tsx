import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import AuthStack from './AuthStack';
import { RootStackParamList } from './interface';
import TabNav from './TabNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from 'utils/constants';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from 'redux/actions/user.action';
import { IDoctor } from 'utils/interfaces/doctor.interface';
import { useNavigation } from '@react-navigation/core';
import { RootStackProps } from 'navigation/interface';
import LoadingScreen from 'screens/loading/LoadingScreen';

interface Props {}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackProps['navigation']>();

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem(AUTH_TOKEN);
      console.log('🚀 ~ authToken', authToken);
      if (authToken) {
        const decoded_info = jwt_decode(authToken) as IDoctor;
        await dispatch(
          login({
            username: decoded_info.username,
            password: decoded_info.password,
          })
        );
        navigation.navigate('TabStack', { screen: 'Home' });
      } else {
        navigation.navigate('AuthStack');
      }
    };
    checkAuth();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="TabStack" component={TabNav} />
    </Stack.Navigator>
  );
};

export default RootStack;
