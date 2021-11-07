import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import ContainerLayout from 'components/ContainerLayout';
import Header from 'components/Header';
import { Avatar, Box, Image, Text } from 'native-base';
import { RootStackProps } from 'navigation/interface';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/actions/user.action';
import { IUserState } from 'redux/reducers/user.reducer';
import { RootState } from 'redux/stores';
import Colors from 'utils/Colors';
import { AUTH_TOKEN } from 'utils/constants';
import { IDoctor } from 'utils/interfaces/doctor.interface';

interface Props {}

const ProfileScreen = (props: Props) => {
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackProps['navigation']>();
  const name = user.fullname;

  const onHandleLogout = async () => {
    const logoutData: IDoctor = {
      id: user.id,
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      phone: user.phone,
      position: user.position,
    };
    await dispatch(logout(logoutData));
    await AsyncStorage.removeItem(AUTH_TOKEN);
    navigation.navigate('AuthStack');
  };

  return (
    <SafeAreaView>
      <Box>
        <Header title="Thông tin cá nhân" />
      </Box>
      <ContainerLayout>
        <Box mt="4" alignItems="center">
          <Avatar bg="green.700" size="xl">
            {name.split(' ')[name.split(' ').length - 1].charAt(0)}
          </Avatar>
          <Text fontSize={20} bold>
            {name}
          </Text>
          <Text fontSize={18}>{user.position}</Text>
          <Text fontSize={18}>Liên hệ: {user.phone}</Text>
        </Box>
        <TouchableOpacity
          style={{ width: '90%', marginTop: 20 }}
          onPress={onHandleLogout}
        >
          <Box style={styles.logoutStyle}>
            <Text fontSize={18} color={Colors.greenDark}>
              Đăng xuất
            </Text>
          </Box>
        </TouchableOpacity>
      </ContainerLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutStyle: {
    borderWidth: 1,
    borderColor: Colors.greenDark,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
