import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge, Box, Image, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from 'screens/home/HomeScreen';
import NotificationScreen from 'screens/notification/NotificationScreen';
import PatientScreen from 'screens/patient/PatientScreen';
import ProfileScreen from 'screens/profile/ProfileScreen';
import Colors from 'utils/Colors';

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
    component: PatientScreen,
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

const Tab = createBottomTabNavigator();

const TabNav = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 12,
          right: 12,
          left: 12,
          borderRadius: 16,
        },
      }}
      initialRouteName='Patient'
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
            tabBarIcon: ({ focused }) => (
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
                    20
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
