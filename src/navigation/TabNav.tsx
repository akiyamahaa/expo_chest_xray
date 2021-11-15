import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge, Box, Image, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice } from 'redux/actions/device.action';
import { IUserState } from 'redux/reducers/user.reducer';
import { RootState } from 'redux/stores';
import * as Notifications from 'expo-notifications';
import HomeScreen from 'screens/home/HomeScreen';
import NotificationScreen from 'screens/notification/NotificationScreen';
import ProfileScreen from 'screens/profile/ProfileScreen';
import Colors from 'utils/Colors';
import { EXPO_TOKEN } from 'utils/constants';
import { registerForPushNotificationsAsync } from 'utils/notification';
import PatientStack from './PatientStack';
import { useNavigation } from '@react-navigation/core';
import { TabStackProps } from './interface';
import { setDiagnosisStatus } from 'redux/actions/xrayDiagnosis.action';
import { getCountUnseen } from 'redux/actions/notification.action';

interface Props {}

const TabArr = [
  {
    id: 1,
    route: 'Home',
    label: 'Home',
    activeIcon: require('assets/icon/home-active.png'),
    inActiveIcon: require('assets/icon/home-inactive.png'),
    component: HomeScreen,
  },
  {
    id: 2,
    route: 'Patient',
    label: 'Patient',
    activeIcon: require('assets/icon/patient-active.png'),
    inActiveIcon: require('assets/icon/patient-inactive.png'),
    component: PatientStack,
  },
  {
    id: 3,
    route: 'Notification',
    label: 'Notification',
    activeIcon: require('assets/icon/notify-active.png'),
    inActiveIcon: require('assets/icon/notify-inactive.png'),
    component: NotificationScreen,
  },
  {
    id: 4,
    route: 'Profile',
    label: 'Profile',
    activeIcon: require('assets/icon/profile-active.png'),
    inActiveIcon: require('assets/icon/profile-inactive.png'),
    component: ProfileScreen,
  },
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

const TabNav = (props: Props) => {
  // DISPATCH
  const dispatch = useDispatch();
  // STATE
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // REDUX
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  // NAVIGATION
  const navigation = useNavigation<TabStackProps['navigation']>();
  const [unseen, setUnseen] = useState(0);

  const onHandleCountUnseen = async () => {
    const count = (await dispatch(getCountUnseen(user.id))) as any as number;
    setUnseen(count);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    const getExpoToken = async () => {
      const expoPushToken = await AsyncStorage.getItem(EXPO_TOKEN);
      if (!expoPushToken) {
        const token: any = await registerForPushNotificationsAsync();
        await AsyncStorage.setItem(EXPO_TOKEN, token);
        const deviceData = {
          doctorId: user.id,
          token,
        };
        console.log(deviceData);
        await dispatch(createDevice(deviceData));
      }
    };
    getExpoToken();
    onHandleCountUnseen();
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {}
    );
    const getStatusNoti = async () => {
      await dispatch(setDiagnosisStatus());
    };
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { data }: any = response.notification.request.content;
        // Get New Data if User still in PatientDetail
        // TODO: Update Notification Right here
        getStatusNoti();
        navigation.navigate('Patient', {
          screen: 'PatientDetail',
          params: { patientId: data.patientId },
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80,
          position: 'absolute',
          bottom: 12,
          right: 12,
          left: 12,
          borderRadius: 16,
        },
      }}
      initialRouteName="Home"
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          name={item.route}
          component={item.component}
          key={item.id}
          options={{
            tabBarLabel: () => (
              <Text fontSize={14} color={Colors.green}>
                {item.label}
              </Text>
            ),

            tabBarIcon: ({ focused }) =>
              !isKeyboardVisible && (
                <Box>
                  <Image
                    source={focused ? item.activeIcon : item.inActiveIcon}
                    style={{ width: 32, height: 32 }}
                    alt="image-icon"
                  />
                  {index == 2 && (
                    <Badge
                      style={{
                        borderRadius: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: -14,
                        top: -10,
                      }}
                      colorScheme="success"
                    >
                      {unseen}
                    </Badge>
                  )}
                </Box>
              ),

            tabBarItemStyle: {
              borderWidth: 0.3,
              borderColor: Colors.green,
              borderTopLeftRadius: index === 0 ? 16 : 0,
              borderBottomLeftRadius: index === 0 ? 16 : 0,
              borderTopRightRadius: index === 3 ? 16 : 0,
              borderBottomRightRadius: index === 3 ? 16 : 0,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNav;
